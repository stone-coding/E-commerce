import { Component } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products: Product[] = [];

  constructor(private productService: ProductService){}

  // similar to componentDidMount for class component
  // useEffect for the functional component
  ngOnInit(): void {
    this.listProducts();
  }

  //Observables are declarative —that is, you define a function for publishing values, 
  //but it is not executed until a consumer subscribes to it. 
  //The subscribed consumer then receives notifications until the function completes, or until they unsubscribe.
  //Assign result to Product array
  listProducts() {
    this.productService.getProductList().subscribe(
      data=>{
        this.products = data;
      }
    )
  }

}
