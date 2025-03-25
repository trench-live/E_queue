package com.personal.api.services;

import com.personal.api.entities.order.CustomerOrder;
import com.personal.api.entities.order.Status;
import com.personal.api.repos.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public CustomerOrder create(CustomerOrder order) {
        // Убедимся, что статус установлен в NEW, если он не был передан
        if (order.getStatus() == null) {
            order.setStatus(Status.NEW);
        }
        return orderRepository.save(order);
    }

    public List<CustomerOrder> getAll() {
        return orderRepository.findAll();
    }

    public CustomerOrder getById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public CustomerOrder update(Long id, CustomerOrder order) {
        Optional<CustomerOrder> existingOrder = orderRepository.findById(id);
        if (existingOrder.isPresent()) {
            order.setId(id);
            return orderRepository.save(order);
        }
        return null;
    }

    public boolean delete(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Status getStatus(Long id) {
        CustomerOrder order = orderRepository.findById(id).orElse(null);
        return order != null ? order.getStatus() : null;
    }

    public CustomerOrder updateStatus(Long id, Status status) {
        Optional<CustomerOrder> existingOrder = orderRepository.findById(id);
        if (existingOrder.isPresent()) {
            CustomerOrder order = existingOrder.get();
            order.setStatus(status);
            return orderRepository.save(order);
        }
        return null;
    }
}