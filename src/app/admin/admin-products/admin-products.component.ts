import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription, Subject } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  public filterdProducts: any[];
  public data: any[];
  subscription: Subscription;
  dtOptions: DataTables.Settings = {};
  // dtOptions: DataTables.Settings={};
  // dtTrigger: Subject<any> = new Subject();
  
  constructor( private productService: ProductService ) {
    this.subscription = this.productService.getAll().
    subscribe(products =>this.filterdProducts = this.products = this.data = products);
    //this.dtTrigger.next();
   }

   filter(query: string){
     this.filterdProducts = (query) ?
     this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())): this.products;

   }
   ngOnDestroy(){
      this.subscription.unsubscribe();
      // this.dtTrigger.unsubscribe();
   }

   ngOnInit() {
    // this.dtOptions= {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   retrieve: true,
    //};
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    }

  }
 }


