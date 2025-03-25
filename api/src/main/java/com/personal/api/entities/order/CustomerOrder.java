package com.personal.api.entities.order;

import com.personal.api.entities.Product;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class CustomerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String storeName;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private List<Product> products = new ArrayList<>();

    @Enumerated(EnumType.STRING) // Указываем, что статус хранится как строка в БД
    private Status status = Status.NEW; // Значение по умолчанию

    public CustomerOrder() {
    }

    public CustomerOrder(String storeName, List<Product> products) {
        this.storeName = storeName;
        this.products = products;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "CustomerOrder{" +
                "id=" + id +
                ", storeName='" + storeName + '\'' +
                ", products=" + products +
                ", status=" + status +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CustomerOrder)) return false;
        CustomerOrder customerOrder = (CustomerOrder) o;
        return id != null && id.equals(customerOrder.id);
    }

    @Override
    public int hashCode() {
        return 31;
    }
}