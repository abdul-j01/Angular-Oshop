import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import { take, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';
import { title } from 'process';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cart: any;
 scart$: Observable<ShoppingCart>;
  constructor(private db: AngularFireDatabase) { }
  
  private create() { 
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  /*async getCartModified():Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .snapshotChanges()
    .pipe(
    map(x => new ShoppingCart(x.payload.exportVal()))
    );
  }*/
  // async getCart1():Promise<AngularFireObject<ShoppingCart>> {
  //   let cartId = await this.getOrCreateCartId();
  //   return this.db.object('/shopping-carts/' + cartId);
  // }

 /* async getCart() :Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .valueChanges()
    .pipe(
      map( (x: ShoppingCart) => new ShoppingCart(x.items))
    );
  }*/

  async getCart() :Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .valueChanges()
    .pipe(
      map( (x: ShoppingCart) => new ShoppingCart(x.items))
    );
  }
  
 private async getOrCreateCartId(): Promise<string>{ //async - await combination for asynch promise calls
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId; 

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    console.log('key----->'+result.key);
    return result.key;

    //alternative way for the above code
    /*if(!cartId){
      this.create().then(results =>{
        localStorage.setItem('cartId', results.key)

        return this.getCart(results.key);
      });
    }else{
        //Add this product to cart
        return this.getCart(cartId);
    }*/
  }

  async clearCart() { 
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
  
  async addToCart(product: Product){
    this.updateItem(product,1);
   /* let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    //let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' +  product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe((item) => {
      //item$.update({ product: product, quantity:(item.quantity || 0) + 1});
      if (item.payload.exists()) {
          item$.update({ quantity: item.payload.exportVal().quantity + 1 });
      } else {
          item$.set({ product: product, quantity: 1 });
      }
  });*/
   //.valueChanges().pipe( take(1),)
    //item$.snapshotChanges().pipe(take(1)).subscribe(item => (item => {
      // item$.snapshotChanges().pipe(take(1),).subscribe((item) => {
      //    console.log('shoping cart Before add:');
      //    item$.update({ product: product, quantity:(item.quantity || 0) + 1});
      //    console.log('shoping cart Added:');
      // }));
  }
  async removeFromCart(product: Product){
    //this.updateItem(product,-1);
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
     item$.snapshotChanges().pipe(take(1)).subscribe((item) => {
        let quantity = (item.payload.exportVal().quantity || 0) - 1;
        if (quantity === 0) item$.remove();
        else
          item$.update({ product: product, quantity: item.payload.exportVal().quantity - 1 });
  });
  }

  private async updateItem(product: Product, change:number){
    console.log('product clicked to add::'+ change);
    let cartId = await this.getOrCreateCartId();
    console.log('cartId to add::'+ cartId);
    console.log('product.key to add::'+ product.key);
    let item$ = this.getItem(cartId, product.key);
     item$.snapshotChanges().pipe(take(1)).subscribe((item) => {

      // let quantity = ( item.payload.exportVal().quantity || 0) + change;
      // if (quantity === 0) item$.remove();

      // else 
      if (item.payload.exists()) {
        // if(item.payload.exportVal().quantity ===0) item$.remove();
        // else 
          item$.update({ quantity: item.payload.exportVal().quantity + change });
      } else {
           item$.set({ product: product, quantity: change });
      }
        //item$.update({ 
          //product: product, 
          //title: product.title,
         // imageUrl: product.imageUrl,
          //price: product.price,
          //quantity: (item.payload.exportVal().quantity || 0 ) + change 
        //});
  });
  }

  // getTotalItemCount(){
    
  // }
}
