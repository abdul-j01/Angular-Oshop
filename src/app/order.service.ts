import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //userDetails: AngularFireObject<>;
  orders: any[];

  constructor(private db: AngularFireDatabase, 
    private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
  // getOrders() { 
  //   return this.db.list('/orders').valueChanges();
  // }
  getOrders() { 
    return this.db.list('/orders')
    .snapshotChanges()
    .pipe(
    map((actions) => {
        return actions.map((action) => ({
            key: action.key,
            val: action.payload.val(),
        }));
    }));
  }

  getOrdersByUser1(userId: string) {
    return this.db.list('/orders/').query.orderByChild(userId).equalTo(userId);
    
    //userId).valueChanges(); 
    // return this.db.list('/orders', 
    //   query: {
    //     orderByChild: 'userId',
    //     equalTo: userId        
    //   }
    // );

    return this.db.list('/orders/'+userId).valueChanges();
  }
  // getOrdersByUser(userId: string):AngularFireList<any[]> {
  //   console.log("----->## ="+userId);
  //   return this.db.list('/orders', ref=>ref.orderByChild('userId').equalTo(userId));
  // }
  getOrdersByUser(userId: string) {
    console.log("----->## ="+userId);
    return this.db.list('/orders', ref=>ref.orderByChild('userId').equalTo(userId))
    .snapshotChanges()
        .pipe(
        map((actions) => {
            return actions.map((action) => ({
                key: action.key,
                val: action.payload.val(),
            }));
        }));   
      }

  get(orderId){
    return this.db.object('/orders/'+orderId);
  }
}
