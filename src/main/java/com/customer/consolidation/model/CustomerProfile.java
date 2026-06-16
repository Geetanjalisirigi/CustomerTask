package com.customer.consolidation.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "customer_profile")
public class CustomerProfile {

    @Id
    private String id;

    private String customerId;
    private String name;
    private String email;
    private String mobile;
    private String city;
}