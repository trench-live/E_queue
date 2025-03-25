package com.personal.api.controllers;

import com.personal.api.entities.order.CustomerOrder;
import com.personal.api.entities.order.Status;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/status")
public class StatusController {

    @GetMapping("/getStatuses")
    public ResponseEntity<List<Map<String, String>>> getAllStatuses() {
        List<Map<String, String>> statuses = Arrays.stream(Status.values())
                .map(status -> Map.of(
                        "name", status.name(), // Название статуса (например, "NEW")
                        "displayName", status.getDisplayName() // Отображаемое название (например, "Новый")
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(statuses);
    }
}
