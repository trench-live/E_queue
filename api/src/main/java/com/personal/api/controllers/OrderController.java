package com.personal.api.controllers;

import com.personal.api.entities.order.CustomerOrder;
import com.personal.api.entities.order.Status;
import com.personal.api.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<CustomerOrder> create(@RequestBody CustomerOrder order) {
        CustomerOrder created_order = orderService.create(order);
        return ResponseEntity.ok(created_order);
    }

    @GetMapping
    public ResponseEntity<List<CustomerOrder>> getAll() {
        List<CustomerOrder> orders = orderService.getAll();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerOrder> getById(@PathVariable Long id) {
        CustomerOrder order = orderService.getById(id);
        return order != null ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerOrder> update(@PathVariable Long id, @RequestBody CustomerOrder order) {
        CustomerOrder updated_order = orderService.update(id, order);
        return updated_order != null ? ResponseEntity.ok(updated_order) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean isDeleted = orderService.delete(id);
        return isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/getStatus")
    public ResponseEntity<Status> getStatus(@PathVariable Long id) {
        Status status = orderService.getStatus(id);
        return status != null ? ResponseEntity.ok(status) : ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/setStatus")
    public ResponseEntity<CustomerOrder> updateStatus(@PathVariable Long id, @RequestParam Status status) {
        CustomerOrder updatedOrder = orderService.updateStatus(id, status);
        return updatedOrder != null ? ResponseEntity.ok(updatedOrder) : ResponseEntity.notFound().build();
    }
}