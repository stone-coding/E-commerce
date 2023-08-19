package com.stone.ecommerce.service;

import com.stone.ecommerce.dto.PaymentInfo;
import com.stone.ecommerce.dto.Purchase;
import com.stone.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
