import { Component, OnInit } from '@angular/core';
import { CartService } from './resources/cart.service';
import { Cart } from './resources/cart';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart$!: Observable<Cart>;

  constructor(private cartService: CartService) {}


  ngOnInit(): void {
    this.cart$ = this.cartService.cart;
  }

}
