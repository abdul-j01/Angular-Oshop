import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product/product-form/product-form.component';
import { ProductService } from './services/product.service';
import { OrderDetailsComponent } from './order-details/order-details.component';


const routes: Routes = [
  {path:'', component: ProductComponent},
  {path:'products', component: ProductComponent},
  {path:'shopping-cart', component: ShoppingCartComponent},
  {path:'login', component: LoginComponent},

  {path:'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
  {path:'order-success/:id', component: OrderSuccessComponent,canActivate: [AuthGuardService]},
  {path:'my/orders', component: MyOrdersComponent,canActivate: [AuthGuardService]},
  
  
  //creating new product
  {
    path:'admin/products/new', 
    component: ProductFormComponent,
    canActivate: [AuthGuardService]
    // canActivate: [AuthGuardService,AdminAuthGuardService]
  },
  //Edit existing product
  {
    path:'admin/products/:id', 
    component: ProductFormComponent,
    canActivate: [AuthGuardService]
    // canActivate: [AuthGuardService,AdminAuthGuardService]
  },
  //listing all products
  {
    path:'admin/products', 
    component: AdminProductsComponent,
    canActivate: [AuthGuardService]
    // canActivate: [AuthGuardService,AdminAuthGuardService]
  },
  {
    path:'admin/orders', 
    component: AdminOrdersComponent,
    canActivate: [AuthGuardService]
    // canActivate: [AuthGuardService,AdminAuthGuardService]
  },
  {
    path:'order/details/:id', 
    component: OrderDetailsComponent,
    canActivate: [AuthGuardService]
    // canActivate: [AuthGuardService,AdminAuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent,ProductComponent,ShoppingCartComponent,CheckOutComponent,OrderSuccessComponent,MyOrdersComponent,AdminProductsComponent,AdminOrdersComponent]

 
