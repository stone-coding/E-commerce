import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators' //reactive javascript different from react.js !

@Injectable({
  providedIn: 'root'
})

//make get request to backend get URL ,and grab, unwrap the data 
export class ProductService {

  private baseUrl = ' http://localhost:8080/api/products ' ;

  constructor(private httpClient: HttpClient) {

   }

   // returns an observable maps the JSON data from spring data rest to product array
   getProductList(): Observable <Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
   );
  }
}

// unwraps the JSON from spring Data REST embedded entry
interface GetResponse{
  _embedded: {
    products:Product[];
  }
}



