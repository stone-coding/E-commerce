import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentInfo } from '../common/payment-info';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {


  private purchaseUrl = environment.click2shopApiUrl + "/checkout/purchase"
  constructor(private httpClient: HttpClient) { }

  //set up paymentIntent URl
  private paymentIntentUrl = environment.click2shopApiUrl + '/checkout/payment-intent'

  // Call REST API
  // returns an observable maps the JSON data from spring data rest to Purchase
  placeOrder(purchase: Purchase):Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase)
  }

  //Make rest API call the backend
  createPaymentIntent(paymentInfo: PaymentInfo ):Observable<any>{
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo)
  }
}
