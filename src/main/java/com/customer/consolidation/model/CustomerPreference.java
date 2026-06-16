package com.customer.consolidation.model;

import lombok.Data;

@Data
public class CustomerPreference {

    private String customerId;
    private String membership;
    private String preferredChannel;
}