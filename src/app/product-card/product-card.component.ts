import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit,OnDestroy{
@Input('product') product: Product;
@Input('show-actions') showActions=true;
@Input('shopping-cart') shoppingCart: ShoppingCart;
sCart: ShoppingCart;
items: any[]=[];
shoppingSuscription: Subscription;

  constructor(private cartService: ShoppingCartService) { }
  ngOnDestroy(): void {
   this.shoppingSuscription.unsubscribe();
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

  async ngOnInit() {
    let cartS = await this.cartService.getCart();
   this.shoppingSuscription = cartS.subscribe( cart => this.sCart = cart);
  }
  getQuantity(product: Product){
    let item = this.sCart.items[product.key];
    item = item ? item.quantity : 0;
    //console.log('item.quantity--->'+item);
    return item;
  }
}
