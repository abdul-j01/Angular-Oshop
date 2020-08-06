import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  client: AngularFireList<any>;
  clients: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  create(product){
    this.db.list('/products').push(product);
    console.log('product saved successfully');
  }

  getAll(){
    this.client = this.db.list('/products');
     return this.clients = this.client.snapshotChanges().pipe(
     map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val() 
      }))

       ));
   }

   get(productId){
     return this.db.object('/products/'+productId);
   }

   update(productId, product){
    return this.db.object('/products/' + productId).update(product);
   }

   delete(productId){
     return this.db.object('/products/' + productId).remove();
   }
}
