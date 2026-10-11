package com.example.dto;

public class OrderDto {
    private String id;
    private String customerId;
    private double total;
    private String status;

    public long getId() { return id; }
    public void setId(String id) { this.id = id; }
    public long getCustomerId() { return customerId; }
    public void setCustomerId(long customerId) { this.customerId = customerId; }
    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
