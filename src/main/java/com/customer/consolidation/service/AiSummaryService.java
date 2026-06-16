package com.customer.consolidation.service;

import com.customer.consolidation.dto.CustomerResponseDTO;
import org.springframework.stereotype.Service;

@Service
public class AiSummaryService {

    public String generateSummary(
            CustomerResponseDTO customer) {

        return customer.getName()
                + " is a "
                + customer.getMembership()
                + " member from "
                + customer.getCity()
                + ". Has placed "
                + customer.getOrders().size()
                + " orders totaling ₹"
                + customer.getTotalOrderAmount()
                + " and prefers communication through "
                + customer.getPreferredChannel()
                + ".";
    }
}