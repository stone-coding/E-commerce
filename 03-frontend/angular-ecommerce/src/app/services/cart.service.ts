import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CartService {

  //create an array of shopping cart items
  cartItems: CartItem[] = [];

  //Subject is a subclass of observable
  //It can use to publish events, and the vent will sent to all of the subscribers
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(theCartItem: CartItem) {
    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item url
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }
    }

    // check if we found it
    alreadyExistsInCart = existingCartItem != undefined;

    if (alreadyExistsInCart) {
      //increment the quantity
      // existingCartItem.quantity++;
      existingCartItem?.quantity ? existingCartItem.quantity++ : 0;
    } else {
      //just add the item to the array
      this.cartItems.push(theCartItem);
    }

    //compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //publish the new value ...all subscribers will receive the new data
    //next will push events to all subscribers
    // here one event for totalPrice and the other for totalQuantityValue from
    // cart service to the cartStatusComponent to update price and quantity in UI
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for debugging purpose
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents for the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(
        `name:${tempCartItem.name}, quantity:${tempCartItem.quantity}, unitPrice:${tempCartItem.unitPrice}, subTotalPrice:${subTotalPrice}`
      );
    }

    console.log(
      `totalPrice: ${totalPriceValue.toFixed(
        2
      )}, totalQuantity:${totalPriceValue}`
    );
    console.log('---');
  }
}
