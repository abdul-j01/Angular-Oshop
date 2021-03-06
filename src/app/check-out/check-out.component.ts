import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  subscription: Subscription;
  
  constructor(private shoppingCartService: ShoppingCartService) {}
  

 async ngOnInit() {
   this.cart$ = await this.shoppingCartService.getCart();
   //this.subscription = cart$.subscribe( cart => this.cart = cart);
  }
}
