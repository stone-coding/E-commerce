import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = ' http://localhost:8080/api/products';

  private categoryUrl = ' http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {}

  // returns an observable maps the JSON data from spring data rest to GetResponseProducts
  SearchProductPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string
  ): Observable<GetResponseProducts> {
    //need to build URL based on keyword, page, and page size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // returns an observable maps the JSON data from spring data rest to GetResponseProducts
  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponseProducts> {
    //need to build URL based on category id, page, and page size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductDetail(theProductId: number): Observable<Product> {
    //need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  // returns an observable maps the JSON data from spring data rest to product array
  searchProducts(theKeyword: string): Observable<Product[]> {
    //need to build URL based on keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  // returns an observable maps the JSON data from spring data rest to product array
  getProductList(theCategoryId: number): Observable<Product[]> {
    //need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  //Common code in SearchProducts and getProductList
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  // Call REST API
  // returns an observable maps the JSON data from sprint data rest to productCategory array
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductsCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }
}

// unwraps the JSON from spring Data REST embedded entry
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  // add pagination support to ProductService
  page: {
    size: number; // size of page
    totalElements: number; // all elements in db
    totalPage: number; // total pages available
    number: number; // current page number
  };
}

// unwraps the JSON from spring Data REST embedded entry
interface GetResponseProductsCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
