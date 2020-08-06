import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { OrderService } from '../order.service';


@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  shipping: any = {};
  //cart: ShoppingCart;
  @Input('cart') cart: ShoppingCart;
  shoppingSuscription: Subscription;
  userId: string;
  authSubscription: Subscription;
  
  constructor( private route: Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService) { }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder(){
    let order ={
      userId: this.userId,
      datePlace : new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.itemsArray.map(i => {
        return {
          product: {
            title: i.product.title,
            imageUrl: i.product.imageUrl,
            price: i.product.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    }
    let result = await this.orderService.placeOrder(order);
    this.route.navigate(['/order-success',result.key]);
  }
}
