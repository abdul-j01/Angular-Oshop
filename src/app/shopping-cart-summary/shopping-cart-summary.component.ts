import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {

@Input('cart') cart: ShoppingCart;
  constructor() {}

  ngOnInit(): void {
  }
}
