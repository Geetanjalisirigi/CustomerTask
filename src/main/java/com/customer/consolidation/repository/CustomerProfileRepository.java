package com.customer.consolidation.repository;

import com.customer.consolidation.model.CustomerProfile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CustomerProfileRepository
        extends MongoRepository<CustomerProfile, String> {

    Optional<CustomerProfile> findByCustomerId(String customerId);
}