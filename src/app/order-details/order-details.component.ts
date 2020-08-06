import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
id;
order: any ;
shipping: any = {};
items:any ={};
  constructor(private route: ActivatedRoute,
    private orderService: OrderService) { 
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("ID===>"+this.id);

    if (this.id) this.orderService.get(this.id)
      .valueChanges()
      .pipe( take(1),)
      .subscribe(p => {
        this.order = p;
        this.items = this.order.items;
      });

    // this.orderService.get(this.id).pipe(
    //   map(order => { 
    //     this.order = order;
    //     console.log("----->"+this.order.val.shipping.name);
    //   }
    //   ));
  }
  get totalItemsCount() {
    let count =0;
    for(let productId in this.items)
        count += this.items[productId].quantity;
    return count;
  }

  get totalPrice(){
    let sum =0;
    for(let productId in this.items)
        sum += this.items[productId].totalPrice;
    
    return sum;
  }
}
