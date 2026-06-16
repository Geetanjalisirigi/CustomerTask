package com.customer.consolidation.service;

import com.customer.consolidation.model.CustomerPreference;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JsonReaderService {

    public List<CustomerPreference> getAllPreferences()
            throws Exception {

        ObjectMapper mapper = new ObjectMapper();

        return mapper.readValue(
                new ClassPathResource(
                        "data/customer_preferences.json")
                        .getInputStream(),
                new TypeReference<List<CustomerPreference>>() {}
        );
    }
}