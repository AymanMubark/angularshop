import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductSingleComponent } from './product-single/product-single.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { SharedModule } from './_modules/shared.module';
import { ErrorInterceptor } from './_interceptor/error.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { AddressComponent } from './address/address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SearchComponent } from './search/search.component';
import { LoadingInterceptor } from './_interceptor/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductSingleComponent,
    LoginComponent,
    SignupComponent,
    CheckoutComponent,
    NotFoundComponent,
    ServerErrorComponent,
    AddressComponent,
    EditAddressComponent,
    CartComponent,
    OrdersComponent,
    ProfileDetailsComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS , useClass : ErrorInterceptor,multi:true},
    {provide : HTTP_INTERCEPTORS , useClass : JwtInterceptor,multi:true},
    {provide : HTTP_INTERCEPTORS , useClass : LoadingInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
