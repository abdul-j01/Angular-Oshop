import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductFormComponent } from '../admin/product/product-form/product-form.component';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  products: Product[] = [];
  filteredProducts: Product[] = [];
 
  category: string;
  cart:any;
  cart$: Observable<ShoppingCart>;

  //subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
   ) { 
    /*productService.getAll().subscribe( products => this.products=products);

    route.queryParamMap.subscribe( params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
      this.products.filter( p => p.category ===this.category) :
      this.products;
    });
    this.categories$ = categoryService.getCategories();*/

    /*productService.getAll()
    .pipe(switchMap ( products =>{
      this.products = products;
      return route.queryParamMap;
    })).subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
      this.products.filter( p => p.category ===this.category) :
      this.products;*/

      //console.log('ProductComponent  ::'+this.filteredProducts[0].key);
      //console.log('products  ::'+ this.products[0].key);
    }
    
    async ngOnInit() {
       //this.subscription = (await this.shoppingCartService.getCart())
      //.subscribe(cart => this.cart =cart);
      this.cart$ = await this.shoppingCartService.getCart();
      this.populateProducts();
    }
    private populateProducts() { 

      this.productService.getAll()
        .pipe(switchMap ( products =>{
          this.products = products;
          return this.route.queryParamMap;
        })).subscribe(params => {
          this.category = params.get('category');
          this.applyFilter(); 
      });
    }

    private applyFilter() { 
      this.filteredProducts = (this.category) ? 
      this.products.filter(p => p.category === this.category) : 
      this.products;
    }
  }
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
  // async ngOnInit() {
  //     //this.subscription = (await this.shoppingCartService.getCart())
  //     //.subscribe(cart => this.cart =cart);
  //     this.cart$ = await this.shoppingCartService.getCart();
  //  }

