import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  //orders$;
  orders$;
  uid:string;
  orderList: any;
  userid: string;

  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 

    this.orders$ = authService.user$.pipe(
      map(u => 
        {
          console.log("user id:=>"+u.uid);
          this.orders$ = this.orderService.getOrdersByUser(u.uid);
          console.log(" this.orders$="+ this.orders$);
          //return orderService.getOrdersByUser(u.uid);
        }))
      ;
    }
}
