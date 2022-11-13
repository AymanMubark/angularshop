import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../_models/cart';
import { orderAdd } from '../_models/orderAdd';
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
  user?: User | null;
  model: orderAdd = {};
  cart?: Cart;

  constructor(private accountService: AccountService, private router: Router, private ordersService: OrdersService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadUser();
    this.loadCart();
  }

  loadCart() {
    this.cartService.currentCart$.subscribe(cart => {
      if (cart)
        this.cart = cart;
    })
  }

  addOrder() {
    this.ordersService.addOrder(this.model).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  loadUser() {
    this.accountService.currentUser$.subscribe(user => {
      if (user) {
          if (user) {
            this.model.userName = user?.unique_name;
            this.model.firstName = user?.name;
            this.model.lastName = user.last_name;
            this.model.email = user.email;
            this.model.phone = user.phone_number;
            this.model.region = user.address_country;
            this.model.city = user.address_city;
            this.model.details = user.address_street;
            this.model.zipCode = user.address_zip_code;
          }
      }
    })

  }

}
