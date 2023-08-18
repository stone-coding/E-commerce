package com.stone.ecommerce.dao;


import com.stone.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

//<entity type, primary key type>
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findByEmail(String theEmail);
}
