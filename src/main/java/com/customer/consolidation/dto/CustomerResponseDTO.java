package com.customer.consolidation.dto;

import lombok.Data;
import java.util.List;

@Data
public class CustomerResponseDTO {

    private String customerId;
    private String name;
    private String email;
    private String mobile;
    private String city;

    private String membership;
    private String preferredChannel;

    private List<OrderDTO> orders;

    private Double totalOrderAmount;
}