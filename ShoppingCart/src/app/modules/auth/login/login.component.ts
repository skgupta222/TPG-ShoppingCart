import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../cart/resources/cart.service';
import { User } from '../resources/auth';
import { AuthService } from '../resources/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private route: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {  }

  user!: User;
  
  updateShoppingCart(userid: string) {
    const observer = {
      next: (cartlist: any) => {
        this.cartService.updatedCartSelection(cartlist);
      },
      error: (err: any) => console.error(err),
    };
    this.cartService.getCartByUserId(userid).subscribe(observer);
  }
  
  onSubmit(f: NgForm) {
    this.spinner.show();
    this.alertService.info('Checking your information...');
    const observer = {
      next: (user: User) => {
        this.user = user;

        this.updateShoppingCart(this.user.id);

        this.authService.updatedUserSelection(this.user);
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.alertService.success(
            'Welcome Back ' + this.user.username + ' !'
          );
          this.route.navigate(['products']);
        }, 0);
      },
      error: (err: any) => {
        this.alertService.danger('Unable to login');
        this.spinner.hide();
      },
    };
    this.authService
      .login(f.value.username, f.value.password)
      .subscribe(observer);
  }

}
