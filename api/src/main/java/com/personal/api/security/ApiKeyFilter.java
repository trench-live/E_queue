package com.personal.api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.List;

public class ApiKeyFilter extends OncePerRequestFilter {

    private static final String API_KEY_HEADER = "X-API-KEY";
    private final String validApiKey;

    public ApiKeyFilter(String validApiKey) {
        this.validApiKey = validApiKey;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // 1. Извлечение ключа
        String providedKey = request.getHeader(API_KEY_HEADER);

        // 2. Валидация наличия ключа
        if (!StringUtils.hasText(providedKey)) {
            sendErrorResponse(response, "API Key is required");
            return;
        }

        // 3. Проверка соответствия
        if (!validApiKey.equals(providedKey)) {
            sendErrorResponse(response, "Invalid API Key");
            return;
        }

        // 4. Установка аутентификации
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(new ApiKeyAuthentication(validApiKey));
        SecurityContextHolder.setContext(context);

        // 5. Продолжение цепочки
        filterChain.doFilter(request, response);
    }

    private void sendErrorResponse(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write(
                String.format("{\"error\": \"%s\", \"status\": 401}", message)
        );
    }

    // Кастомная реализация аутентификации
    private static class ApiKeyAuthentication extends AbstractAuthenticationToken {
        private final String apiKey;

        public ApiKeyAuthentication(String apiKey) {
            super(List.of(new SimpleGrantedAuthority("ROLE_SERVICE")));
            this.apiKey = apiKey;
            super.setAuthenticated(true); // Важно!
        }

        @Override
        public Object getCredentials() {
            return null;
        }

        @Override
        public Object getPrincipal() {
            return apiKey;
        }
    }
}