import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import {  Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{

  user$: Observable<firebase.User>
  //appUser: AppUser;
 //shoppingCartItemCount: number;
 cart$: Observable<ShoppingCart>;

  constructor(
    private afAuth: AngularFireAuth,
    private shoppingCartService: ShoppingCartService,
    private route: Router
    ) {
    this.user$=afAuth.authState;
    //this.auth.appUser$.subscribe(appUser => this.appUser=appUser);
   }

  logout(){
    this.afAuth.auth.signOut();
    this.route.navigate(['/login']);
  }

   async ngOnInit() {
   // this.auth.appUser$.subscribe(appUser => this.appUser=appUser);
      this.cart$ = await this.shoppingCartService.getCart();
     /* cart$.subscribe(
        cart =>{
          this.shoppingCartItemCount =0;
          for(let productId in cart.items){
            this.shoppingCartItemCount += cart.items[productId].quantity;
          }
        });*/
  }
  
}
