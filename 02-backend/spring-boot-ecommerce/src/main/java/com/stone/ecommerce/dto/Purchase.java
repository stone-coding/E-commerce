package com.stone.ecommerce.dto;

import com.stone.ecommerce.entity.Address;
import com.stone.ecommerce.entity.Customer;
import com.stone.ecommerce.entity.Order;
import com.stone.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
