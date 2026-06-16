package com.customer.consolidation.controller;

import com.customer.consolidation.dto.CustomerResponseDTO;
import com.customer.consolidation.model.CustomerProfile;
import com.customer.consolidation.service.CustomerService;
import com.customer.consolidation.service.CsvReaderService;
import com.customer.consolidation.service.JsonReaderService;
import com.customer.consolidation.service.AiSummaryService;
import java.util.Map;



import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin("*")
public class CustomerController {

    private final CustomerService service;
    private final CsvReaderService csvReaderService;
    private final JsonReaderService jsonReaderService;
    private final AiSummaryService aiSummaryService;

    public CustomerController(
        CustomerService service,
        CsvReaderService csvReaderService,
        JsonReaderService jsonReaderService,
        AiSummaryService aiSummaryService) {

    this.service = service;
    this.csvReaderService = csvReaderService;
    this.jsonReaderService = jsonReaderService;
    this.aiSummaryService = aiSummaryService;
}

    @GetMapping("/{customerId}")
    public CustomerProfile getCustomer(
            @PathVariable String customerId) {

        return service.getCustomer(customerId);
    }

    @GetMapping("/orders")
    public Object getOrders() throws Exception {

        return csvReaderService.getAllOrders();
    }
    @GetMapping("/preferences")
    public Object getPreferences() throws Exception {

        return jsonReaderService.getAllPreferences();
}
@GetMapping("/{customerId}/details")
public CustomerResponseDTO getCustomerDetails(
        @PathVariable String customerId)
        throws Exception {

    return service.getCustomerDetails(customerId);
}
@GetMapping("/{customerId}/summary")
public Map<String, String> getSummary(
        @PathVariable String customerId)
        throws Exception {

    CustomerResponseDTO customer =
            service.getCustomerDetails(customerId);

    return Map.of(
            "summary",
            aiSummaryService.generateSummary(customer)
    );
}
}