import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = '';
  searchMode: boolean = false;
  

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = '';

  theKeyword: string ='';

  //inject the ActivatedRoute that loaded the component
  //which is for accessing route parameters
  constructor(
    private productService: ProductService,
    private cartService: CartService,
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

    if (this.searchMode && this.route.snapshot.paramMap.get('keyword') != '') {
      this.handleSearchProducts();
    } else {
      this.searchMode = false;
      this.handleListProducts();
    }
  }

  //Observables are declarative —that is, you define a function for publishing values,
  //but it is not executed until a consumer subscribes to it.
  //The subscribed consumer then receives notifications until the function completes, or until they unsubscribe.
  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have a different keyword than previous
    // then set thePageNumber to 1
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1
    }

    this.previousKeyword = theKeyword;
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    //now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber - 1, 
                                               this.thePageSize,
                                               theKeyword).subscribe(this.processResult());
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

      /**
       * check if we have different category than previous 
       * Note:Angular will reuse a component if it is currently being viewed
       */
      if(this.previousCategoryId != this.currentCategoryId) {
        this.thePageNumber = 1
      }
  
      this.previousCategoryId = this.currentCategoryId
      console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    }

   

    // update ProductListComponent to handle pagination 
    // pagination component pages are 1 bases, and on spring data rest are 0 zero,
    // so we have to minus 1 to map the spring backend data 
    // unwraps the JSON from spring Data REST embedded entry
    this.productService
      .getProductListPaginate(this.thePageNumber - 1, 
                              this.thePageSize, 
                              this.currentCategoryId)
      .subscribe(this.processResult());
  }

  //set page size on parameter value
  //convert string to number using +operator 
  updatePageSize(pageSize: string) {
    this.thePageSize =+pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult(){
    return (data: any) => {
      //  right is data from Spring Data REST JSON
      //  left are properties defined in this class
      //  spring data rest pages are 0 based so need 
      //  add 1 before send to thePageNumber
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  // call CartService.ts 
  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }
}
