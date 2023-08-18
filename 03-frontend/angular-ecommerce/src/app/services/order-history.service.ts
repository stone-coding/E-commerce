import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = environment.click2shopApiUrl + '/orders';

  constructor(private httpClient: HttpClient) { }

  // returns an observable maps the JSON data from spring data rest to GetResponseOrderHistory
  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory>{

  // need to build URL based on customer email
  
  const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmail?email=${theEmail}`;

  return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
  }

}

//Unwrap the JSON from Spring Data REST _embedded entry 
interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[];
  }
}

