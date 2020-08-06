import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart{
    itemsArray: ShoppingCartItem[]=[];

    constructor(public items: ShoppingCartItem[] ){
        this.items = items || [];
        for(let productId in this.items){
            let item = this.items[productId];
            this.itemsArray.push( new ShoppingCartItem(item.product,item.quantity));
        }
     }

    get totalItemsCount() {
        let count =0;
        for(let productId in this.items)
            count += this.items[productId].quantity;
        return count;
    }

    get totalPrice(){
        let sum =0;
        for(let productId in this.itemsArray)
            sum += this.itemsArray[productId].totalPrice;
        
        return sum;
    }

    getQuantity(product: Product){
        //console.log('item.quantity--->'+product.key);
         let item = this.items[product.key];
        //console.log('item.quantity--->'+item.quantity);
        return item ? item.quantity : 0;
      }
    get productIds(){
        return Object.keys(this.items);
    }
}