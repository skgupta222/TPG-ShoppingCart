import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth/resources/auth.service';
import { User } from '../auth/resources/auth';
import * as fromProductModels from '../products/resources/product';
import { environment } from 'src/environments/environment';
import { AlertService } from '@full-fledged/alerts';
import { ProductService } from './resources/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: fromProductModels.Product[] = [];
  user!: User;
  
  constructor(
    private productService: ProductService,
    public router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.spinner.show();
    const productsObserver = {
      next: (response: fromProductModels.Product[]) => {
        this.products = response;       
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      },
      error: (err: any) => {
        console.error(err);
        this.alertService.danger('Unable to load products');
        this.spinner.hide();
      },
    };

    this.productService.getAllProducts().subscribe(productsObserver);
  }
}
