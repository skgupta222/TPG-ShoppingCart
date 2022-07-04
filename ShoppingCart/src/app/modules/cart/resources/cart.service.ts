import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Cart } from './cart';
import { tap, switchMap } from 'rxjs/operators';
import { HelperCartService } from './helper-shopping.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private helper: HelperCartService) {}
  baseUrl: string = 'http://localhost:3000/carts/';

  private cartSource = new BehaviorSubject<Cart>({
    id: '',
    userid: '',
    products: [],
    isCartEmpty: true,
    cartItemsLength: 0,
    productsSubtotal: 0,
  });
  cart = this.cartSource.asObservable();

  getCartByUserId(userid: string): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl + '?userid=' + userid).pipe(
      switchMap((carts: any) => {   
        let cart: Cart = carts[0];     
        if (cart) {
          cart.isCartEmpty = this.helper.isProductsEmpty(cart.products);
          cart.cartItemsLength = this.helper.productsTotalItems(cart.products);
          cart.productsSubtotal = this.helper.productsSubTotal(cart.products);
          return of(cart);
        } else {
          return throwError(() => new Error('Unable to get shopping cart'));
        }
      })
    );
  }

  updateCart(id: string, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(this.baseUrl + id, cart).pipe(
      switchMap((cart) => {       
        if (cart) {
          cart.isCartEmpty = this.helper.isProductsEmpty(cart.products);
          cart.cartItemsLength = this.helper.productsTotalItems(cart.products);
          cart.productsSubtotal = this.helper.productsSubTotal(cart.products);
          return of(cart);
        } else {
          return throwError(() => new Error('Unable to update shopping cart'));
        }
      })
    );
  }

  updatedCartSelection(cart: Cart) {
    this.cartSource.next(cart);
  }
}
