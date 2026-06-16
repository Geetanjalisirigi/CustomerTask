package com.customer.consolidation.model;

import lombok.Data;

@Data
public class CustomerOrder {

    private String customerId;
    private String orderId;
    private String orderDate;
    private Double amount;
}