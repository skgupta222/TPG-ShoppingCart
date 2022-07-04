import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/resources/auth.service';
import { User } from 'src/app/modules/auth/resources/auth';
import { CartService } from 'src/app/modules/cart/resources/cart.service';
import * as fromAuthModels from 'src/app/modules/auth/resources/auth';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user!: User;
  
  constructor(
    private authService: AuthService, 
    private cartService: CartService,
    private router: Router,
    private alertService: AlertService,
    ) {}

  ngOnInit(): void {
    const userobserver = {
      next: (user: User) => {
        this.user = user;
      },
      error: (err: any) => console.error(err),
    };

    this.authService.user.subscribe(userobserver);
  }

  logout() {
    this.cartService.updatedCartSelection({
      id: '',
      userid: '',
      products: [],
      isCartEmpty: true,
      cartItemsLength: 0,
      productsSubtotal: 0,
    });
    this.authService.updatedUserSelection(fromAuthModels.UserModel);
    localStorage.removeItem('user');

    this.router.navigate(['home']);
    this.alertService.danger('You are logged out');

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.alertService.info('Come Back Soon!');
    }, 2000);
  }
}
