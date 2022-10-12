import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductSingleComponent } from './product-single/product-single.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { SearchComponent } from './search/search.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './_gurads/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', 
    runGuardsAndResolvers :'always',
    canActivate : [AuthGuard],
    children:[
        { path: 'address', component: AddressComponent },
        { path: 'edit-address', component: EditAddressComponent },
        { path: 'order', component: OrdersComponent },
        { path: 'profile-details', component: ProfileDetailsComponent },
        { path: 'dashboard', component: DashboardComponent },
    ]
  },
  { path: 'search', component: SearchComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'product-single/:id', component: ProductSingleComponent},
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '**', component: HomeComponent ,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
