import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

categories$;
product: any = {};
id;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) { 
    this.categories$ = categoryService.getCategories();

    //let id = this.route.snapshot.paramMap.get('id');
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log ("this.id ="+  this.id);

    //if (this.id) this.productService.get(this.id).valueChanges().subscribe(p => this.product = p);
    if (this.id) this.productService.get(this.id)
      .valueChanges()
      .pipe( take(1),)
      .subscribe(p => this.product = p);
  }

  ngOnInit(): void {

  }

  save(product){
    //console.log(product);

    if(this.id) this.productService.update(this.id,product);
    else  this.productService.create(product);

    this.router.navigate(['admin/products']);
  }

  delete(){
    if( !confirm('Are you sure want to delete this product'))return;

    this.productService.delete(this.id);
    this.router.navigate(['admin/products']);
  }

}
