import { Component, OnInit } from '@angular/core';
import { User } from '../modules/auth/resources/auth';
import { AuthService } from '../modules/auth/resources/auth.service';
import { Cart } from '../modules/cart/resources/cart';
import { CartService } from '../modules/cart/resources/cart.service';


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  
  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user')|| '{}');

    if (user) {
      this.updateShoppingCart(user.id);

      this.authService.updatedUserSelection(user);
    }
  }

  updateShoppingCart(userid: string) {
    const observer = {
      next: (cart: Cart) => {
        this.cartService.updatedCartSelection(cart);
      },
      error: (err: any) => console.error(err),
    };
    this.cartService.getCartByUserId(userid).subscribe(observer);
  }
}
