import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Click2ShopFormService } from 'src/app/services/click2-shop-form.service';
import { Click2ShopValidators } from 'src/app/validators/click2-shop-validators';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  

  // inject form service and click2shopformservice
  constructor(private formBuilder:FormBuilder,
              private click2shopformservice: Click2ShopFormService ) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      // customer: name of key in form group
      customer: this.formBuilder.group({
        //specific the validation rules for the form controls 
        firstName: new FormControl('', 
        [Validators.required, Validators.minLength(2),
        Click2ShopValidators.notOnlyWhitespace]
        ),
        
        lastName:  new FormControl('', 
        [Validators.required, Validators.minLength(2),
        Click2ShopValidators.notOnlyWhitespace
        ]),
        email: new FormControl('', 
                            [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      }),

      shippingAddress: this.formBuilder.group({
        street: new FormControl('', 
        [Validators.required, Validators.minLength(2),
        Click2ShopValidators.notOnlyWhitespace
        ]),

        city: new FormControl('', 
        [Validators.required, Validators.minLength(2),
        Click2ShopValidators.notOnlyWhitespace
        ]),

        state: new FormControl('', [Validators.required]),

        country:new FormControl('', [Validators.required]),

        zipCode: new FormControl('', 
        [Validators.required, Validators.minLength(2),
        Click2ShopValidators.notOnlyWhitespace
        ])
      }),

      billingAddress: this.formBuilder.group({
        street: new FormControl('', 
        [Validators.required, Validators.minLength(2),
        Click2ShopValidators.notOnlyWhitespace
        ]),

        city: new FormControl('', 
        [Validators.required, Validators.minLength(2),
        Click2ShopValidators.notOnlyWhitespace
        ]),

        state: new FormControl('', [Validators.required]),

        country:new FormControl('', [Validators.required]),

        zipCode: new FormControl('', 
        [Validators.required, Validators.minLength(2),
        Click2ShopValidators.notOnlyWhitespace
        ])
      }),

      creditCard: this.formBuilder.group({
        cardType:new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', 
        [Validators.required, Validators.minLength(2),
        Click2ShopValidators.notOnlyWhitespace
        ]),
        cardNumber:new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode:new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth:[''],
        expirationYear:[''],
      }),
    });


    //populate credit card months
    //JS Date obj months are 0 based(0 - 11), so we add 1 (1 - 12)
    const startMonth:number = new Date().getMonth() + 1;
    console.log("StartMonth: " + startMonth);

    // pass the startMonth as param to getCreditCardMonths to get valid range 
    // of credit card months
    this.click2shopformservice.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit cart months: " + JSON.stringify(data));
        this.creditCardMonths = data; 
      },
    )
    

    //populate credit card years
    this.click2shopformservice.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit cart years: " + JSON.stringify(data));
        this.creditCardYears = data; 
      },
    )

    //populate countries
    this.click2shopformservice.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
        
      }
    )
  }

  //define getter methods for Customer
  get firstName(){
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName(){
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email(){
    return this.checkoutFormGroup.get('customer.email');
  }

  //define getter methods for Shipping Address
  get shippingAddressStreet(){
    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  get shippingAddressCity(){
    return this.checkoutFormGroup.get('shippingAddress.city');
  }

  get shippingAddressState(){
    return this.checkoutFormGroup.get('shippingAddress.state');
  }

  get shippingAddressZipCode(){
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  get shippingAddressCountry(){
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  //define getter methods for Billing Address
  get billingAddressStreet(){
    return this.checkoutFormGroup.get('billingAddress.street');
  }

  get billingAddressCity(){
    return this.checkoutFormGroup.get('billingAddress.city');
  }

  get billingAddressState(){
    return this.checkoutFormGroup.get('billingAddress.state');
  }

  get billingAddressZipCode(){
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  get billingAddressCountry(){
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  //define getter methods for Credit Card
  get creditCardType(){
    return this.checkoutFormGroup.get('creditCard.cardType');
  }

  get creditCardNameOnCard(){
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }

  get creditCardNumber(){
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }

  get creditCardSecurityCode(){
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }



  copyShippingAddressToBillingAddress(event){

    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value)

      //bug fix for states
      this.billingAddressStates = this.shippingAddressStates
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset()

      //bug fix for states
      this.billingAddressStates = [];
    }
  }

  onSubmit() {

    if (this.checkoutFormGroup.invalid) {
      // markAllAsTouched touching all fields triggers the display of the error message.
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log('handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')!.value);
  
    console.log("The email address is " + this.checkoutFormGroup.get('customer')!.value.email);

    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress')!.value.country.name);
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress')!.value.state.name);
  }

  handleMonthsAndYears(){

    // get the form group name by 'formGroupName'
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard')
    const currentYear: number = new Date().getFullYear();

    //read the selected year from the form
    const selectedYear: number =Number(creditCardFormGroup.value.expirationYear);

    //if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }else {
      startMonth = 1;
    }

    // pass the startMonth as param to getCreditCardMonths to get valid range 
    // of credit card months
    this.click2shopformservice.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit cart months: " + JSON.stringify(data));
        this.creditCardMonths = data; 
      },
    )
  }

  getStates(formGroupName:string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`{formGroupName} country code: ${countryCode}`);
    console.log(`{formGroupName} country name: ${countryName}`);
    
    this.click2shopformservice.getStates(countryCode).subscribe(
      data =>{
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data
        }else{
          this.billingAddressStates = data;
        }

        //select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    )
  }

  

}
