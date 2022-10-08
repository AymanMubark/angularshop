import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../_models/cart';
import { orderAdd } from '../_models/orderAdd';
import { OrderDetailAdd } from '../_models/orderDetailadd';
import { User } from '../_models/user';
import { UserDetails } from '../_models/userDetails';
import { AccountService } from '../_services/account.service';
import { CartService } from '../_services/cart.service';
import { OrdersService } from '../_services/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  user?: UserDetails;
  model: orderAdd ={};
  cart?: Cart[] = [];
  total : number = 0;

  constructor(private accountService: AccountService,private router : Router,private ordersService : OrdersService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadUser();
    this.loadCart();
  }

  loadCart() {
    this.cartService.currentCart$.subscribe(cart => {
      if (cart) {
        this.cart = cart;
        this.model.orderDetails = [];
        this.cart.forEach(cart => {
          let orderDetail : OrderDetailAdd = {
            productId : cart.product.id,
            quantity :cart.quantity,
          };   
          this.model.orderDetails?.push(orderDetail);
        });
         this.total = cart .reduce((sum, current) => sum + current.product.price * current.quantity, 0);
      }
    })
  }

  addOrder(){
    this.ordersService.addOrder(this.model).subscribe(()=>{
      this.router.navigateByUrl('/');
      this.cartService.update([]);
    });
  }

  loadUser() {
    this.accountService.currentUser$.subscribe(user => {
      if (user) {
        this.accountService.getUserDetails().subscribe(user => {
          if (user) {
            this.user = user;
            this.model.firstName = user.firstName;
            this.model.lastName = user.lastName;
            this.model.email = user.email;
            this.model.phone = user.phoneNumber;
            this.model.region = user.address?.region;
            this.model.city = user.address?.city;
            this.model.details = user.address?.details;
          }
        })
      }
    })

  }

}
