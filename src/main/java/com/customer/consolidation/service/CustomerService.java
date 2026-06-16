package com.customer.consolidation.service;

import com.customer.consolidation.dto.CustomerResponseDTO;
import com.customer.consolidation.dto.OrderDTO;
import com.customer.consolidation.model.CustomerOrder;
import com.customer.consolidation.model.CustomerPreference;
import com.customer.consolidation.model.CustomerProfile;
import com.customer.consolidation.repository.CustomerProfileRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    private final CustomerProfileRepository repository;
    private final CsvReaderService csvReaderService;
    private final JsonReaderService jsonReaderService;

    public CustomerService(
            CustomerProfileRepository repository,
            CsvReaderService csvReaderService,
            JsonReaderService jsonReaderService) {

        this.repository = repository;
        this.csvReaderService = csvReaderService;
        this.jsonReaderService = jsonReaderService;
    }

    public CustomerProfile getCustomer(String customerId) {

        return repository.findByCustomerId(customerId)
                .orElseThrow(() ->
                        new RuntimeException("Customer not found"));
    }

    public CustomerResponseDTO getCustomerDetails(String customerId)
            throws Exception {

        CustomerProfile profile =
                repository.findByCustomerId(customerId)
                        .orElseThrow(() ->
                                new RuntimeException("Customer not found"));

        List<CustomerOrder> customerOrders =
                csvReaderService.getAllOrders()
                        .stream()
                        .filter(order ->
                                order.getCustomerId().equals(customerId))
                        .toList();

        CustomerPreference preference =
                jsonReaderService.getAllPreferences()
                        .stream()
                        .filter(pref ->
                                pref.getCustomerId().equals(customerId))
                        .findFirst()
                        .orElse(null);

        CustomerResponseDTO response =
                new CustomerResponseDTO();

        response.setCustomerId(profile.getCustomerId());
        response.setName(profile.getName());
        response.setEmail(profile.getEmail());
        response.setMobile(profile.getMobile());
        response.setCity(profile.getCity());

        if (preference != null) {
            response.setMembership(preference.getMembership());
            response.setPreferredChannel(
                    preference.getPreferredChannel());
        }

        List<OrderDTO> orderDTOs =
                customerOrders.stream()
                        .map(order -> {

                            OrderDTO dto = new OrderDTO();

                            dto.setOrderId(order.getOrderId());
                            dto.setAmount(order.getAmount());

                            return dto;
                        })
                        .collect(Collectors.toList());

        response.setOrders(orderDTOs);

        double totalAmount =
                customerOrders.stream()
                        .mapToDouble(CustomerOrder::getAmount)
                        .sum();

        response.setTotalOrderAmount(totalAmount);

        return response;
    }
}