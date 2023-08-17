package com.stone.ecommerce.service;

import com.stone.ecommerce.dto.Purchase;
import com.stone.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

}
