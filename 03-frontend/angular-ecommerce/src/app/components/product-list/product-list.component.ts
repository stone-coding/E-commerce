import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: Product[] = [];
  currentCategoryId: number = 1;
  currentCategoryName: string = '';
  searchMode: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  // similar to componentDidMount for class component
  // useEffect for the functional component
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }


  listProducts() {
    // check keyword from router 'search/:keyword' in app.module.ts and if it has given keyword
    // pass it to the value param in doSearch() in SearchComponent
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  //Observables are declarative —that is, you define a function for publishing values,
  //but it is not executed until a consumer subscribes to it.
  //The subscribed consumer then receives notifications until the function completes, or until they unsubscribe.
  handleSearchProducts() {
    // get the keyword from search bar 
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // now search the product using given keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  handleListProducts() {
    // 5.Enhance ProductListComponent to read category id param
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the "id" param string. convert string to a number using the "+" symbol
      //using ! is the non-null assertion operator tells compiler that object is not null
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
     
      // get the name "param" string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    } else {
      // no category id available... default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    // now get the product for the given category id
    this.productService
      .getProductList(this.currentCategoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
