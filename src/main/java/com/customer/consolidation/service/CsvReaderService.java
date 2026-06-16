package com.customer.consolidation.service;

import com.customer.consolidation.model.CustomerOrder;
import com.opencsv.CSVReader;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvReaderService {

    public List<CustomerOrder> getAllOrders() throws Exception {

        CSVReader reader = new CSVReader(
                new InputStreamReader(
                        new ClassPathResource(
                                "data/customer_orders.csv")
                                .getInputStream()));

        List<String[]> rows = reader.readAll();

        List<CustomerOrder> orders = new ArrayList<>();

        for (int i = 1; i < rows.size(); i++) {

            String[] row = rows.get(i);

            CustomerOrder order = new CustomerOrder();

            order.setCustomerId(row[0]);
            order.setOrderId(row[1]);
            order.setOrderDate(row[2]);
            order.setAmount(Double.parseDouble(row[3]));

            orders.add(order);
        }

        return orders;
    }
}