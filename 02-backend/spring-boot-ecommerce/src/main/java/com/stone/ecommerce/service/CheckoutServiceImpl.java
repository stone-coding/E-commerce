package com.stone.ecommerce.service;

import com.stone.ecommerce.dao.CustomerRepository;
import com.stone.ecommerce.dto.Purchase;
import com.stone.ecommerce.dto.PurchaseResponse;
import com.stone.ecommerce.entity.Customer;
import com.stone.ecommerce.entity.Order;
import com.stone.ecommerce.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional // intercept the method before and after, then create or join a transaction
    // before the target method starts, and submit or roll back the transaction
    // according to the execution status after the target method is executed.
    public PurchaseResponse placeOrder(Purchase purchase) {
        // retrieve the order info from dto
        Order order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // populate order with billingAddress and shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setBillingAddress(purchase.getShippingAddress());
        // populate customer with order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        // save to database
        customerRepository.save(customer);

        //return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    //want a unique id that is hard to guess and random
    private String generateOrderTrackingNumber() {

        // generate a random UUID number (UUID version-4)
        // Universally Unique IDentifier, by the way – is a 36-character alphanumeric string
        // that can be used to identify information.

        return UUID.randomUUID().toString();
    }
}




