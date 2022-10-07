import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductSingleComponent } from './product-single/product-single.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './_gurads/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', 
    runGuardsAndResolvers :'always',
    canActivate : [AuthGuard],
    children:[
        { path: 'checkout', component: CheckoutComponent },
        { path: 'address', component: AddressComponent },
        { path: 'edit-address', component: EditAddressComponent },
    ]
  },
  { path: 'product-single/:id', component: ProductSingleComponent},
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: HomeComponent ,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
