import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget'
import myAppConfig from 'src/app/config/my-app-config';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true, //proof key for code exchange 
        issuer: myAppConfig.oidc.issuer,
        scope: myAppConfig.oidc.scopes
      }
    });
   }

  ngOnInit(): void {
    // remove previous element rendered
    this.oktaSignin.remove();

    // render signin widget
    this.oktaSignin.renderEl({
      //render element with given id 
      el:'#okta-sign-in-widget'}, // this name should be same as div tag id in login.component    
      (response: any) => {
        if(response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error : any) => {
        throw error;
      }
    )
  }

}
