import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';

//1.define routers
const routes : Routes = [
  //router for product detail component
  //search routers
  {path:'search/:keyword', component:ProductListComponent},
  // when path matches create new instance of ProductListComponent component
  {path:'category/:id/:name', component: ProductListComponent},
  {path:'category', component: ProductListComponent},
  {path:'products', component: ProductListComponent},
  // when no path for error path redirect to products
  {path:'', redirectTo:'/products', pathMatch:'full'},
  {path:'**', redirectTo:'/products',pathMatch: 'full'},
]

@NgModule({
  declarations: [AppComponent, ProductListComponent, ProductCategoryMenuComponent, SearchComponent],
  imports: [RouterModule.forRoot(routes), BrowserModule, HttpClientModule],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
