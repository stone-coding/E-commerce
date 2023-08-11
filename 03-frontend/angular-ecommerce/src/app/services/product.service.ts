import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'; //reactive javascript different from react.js !
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})

//make get request to backend get URL ,and grab, unwrap the data
export class ProductService {

  private baseUrl = ' http://localhost:8080/api/products';

  private categoryUrl = ' http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {}

  // returns an observable maps the JSON data from spring data rest to product array
  getProductList(theCategoryId: number): Observable<Product[]> {
    //need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  //Call REST API
  // returns an observable maps the JSON data from sprint data rest to productCategory array
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }


  searchProducts(theKeyword: string): Observable<Product[]> {
    //need to build URL based on keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  //Refactor part of Product base on searchUrl
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  //get the product detail when click product img/name
  getProductDetail(theProductId: number): Observable<Product> {
    //need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }
}

// unwraps the JSON from spring Data REST embedded entry
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}

// unwrap the json from spring data rest embedded entry
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
