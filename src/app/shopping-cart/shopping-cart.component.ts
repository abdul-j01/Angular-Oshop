import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    // this.auth.appUser$.subscribe(appUser => this.appUser=appUser);
    this.cart$ = await this.shoppingCartService.getCart();
      /*cart$.subscribe(
      cart =>{
        this.items = cart.items;
        //new ShoppingCart(cart.items);
        this.shoppingCartItemCount =0;
        for(let productId in cart.items){
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });*/
   }
   clearCart(){
     this.shoppingCartService.clearCart();
   }
 }
