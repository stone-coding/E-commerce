import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import { OktaAuthModule, OktaCallbackComponent,OKTA_CONFIG, OktaAuthGuard} from '@okta/okta-angular';   
import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig); //create oktaAuth pass oktaConfig

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector){
  //use injector to access any service available within your application
  const router = injector.get(Router);

  //Redirect the user to your custom login page
  router.navigate(['/login']);
}

//1.define routers
const routes: Routes = [

  //router for member only page, if authenticated, give access to route, else send to
  //login page
  {path:'members', component:MembersPageComponent, canActivate: [OktaAuthGuard],
                   data: {onAuthRequired: sendToLoginPage}},
  //router for login status component
  {path:'login/callback', component:OktaCallbackComponent},
  {path:'login', component:LoginComponent},
  //router for check out component
  {path:'checkout', component:CheckoutComponent},
  //router for cart detail component
  {path:'cart-details', component:CartDetailsComponent},
  //router for product detail component
  {path:'products/:id', component:ProductDetailsComponent},
  //search routers
  {path:'search/:keyword', component:ProductListComponent},
  // when path matches create new instance of ProductListComponent component
  {path:'category/:id/:name', component: ProductListComponent},
  {path:'category', component: ProductListComponent},
  {path:'products', component: ProductListComponent},
  // when no path for error path redirect to products
  {path:'', redirectTo:'/products', pathMatch:'full'},
  {path:'**', redirectTo:'/products',pathMatch: 'full'},
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, {provide:OKTA_CONFIG, useValue: {oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
