import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
/**
 * cart status subscribes events in cartService 
 */
export class CartStatusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
