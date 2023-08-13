import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = ' http://localhost:8080/api/products';

  private categoryUrl = ' http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }
  

    // returns an observable maps the JSON data from spring data rest to product array
    getProductList(theCategoryId: number): Observable<Product[]> {
      //need to build URL based on category id
      const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
      return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
        map(response => response._embedded.products)
      );
    }   
    
    // Call REST API
    // returns an observable maps the JSON data from sprint data rest to productCategory array
    getProductCategories(): Observable<ProductCategory[]>  {
      return this.httpClient.get<GetResponseProductsCategory>(this.categoryUrl).pipe(
        map(response => response._embedded.productCategory)
      );
    }

}

// unwraps the JSON from spring Data REST embedded entry
interface GetResponseProducts {
  _embedded: {
    products:Product[];
  }
}

// unwraps the JSON from spring Data REST embedded entry
interface GetResponseProductsCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}


