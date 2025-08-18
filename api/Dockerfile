# Этап сборки
FROM maven:3.8.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests

# Этап запуска
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Копируем конкретный WAR-файл
COPY --from=builder /app/target/api-0.0.1-SNAPSHOT.war ./app.war

# Настройки
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75 -Djava.security.egd=file:/dev/./urandom"
EXPOSE 8080

# Запуск
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.war"]