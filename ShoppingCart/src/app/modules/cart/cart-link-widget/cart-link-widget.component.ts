import { Component, OnInit } from '@angular/core';
import { Cart } from '../resources/cart';
import { CartService } from '../resources/cart.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-link-widget',
  templateUrl: './cart-link-widget.component.html',
  styleUrls: ['./cart-link-widget.component.scss']
})
export class CartLinkWidgetComponent implements OnInit {

  cart$!: Observable<Cart>;
  constructor(private cartService: CartService, private route: Router,) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart;    
  }

  cartDetails() {
    this.route.navigate(['/shopping/cart']);
  }
  
}
