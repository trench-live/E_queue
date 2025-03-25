package com.personal.api.entities.order;

public enum Status {
    NEW("Новый"),               // Новый заказ
    IN_PROGRESS("В обработке"), // Заказ в обработке
    COMPLETED("Завершен"),      // Заказ выполнен
    CANCELLED("Отменен");       // Заказ отменен

    private final String displayName;

    Status(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}