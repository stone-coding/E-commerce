package com.stone.ecommerce.controller;

import com.stone.ecommerce.dto.Purchase;
import com.stone.ecommerce.dto.PurchaseResponse;
import com.stone.ecommerce.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
//  @RequestBody annotation maps the HttpRequest body to a transfer or domain object,
//  enabling automatic deserialization of the inbound HttpRequest body onto a Java object.
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }

}
