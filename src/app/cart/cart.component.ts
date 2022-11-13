import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../_models/cart';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart?: Cart;
  user?: User | null;
  change: boolean = false;
  constructor(private cartService: CartService, private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadUser();
    this.loadCart();
  }

  loadUser() {
    this.accountService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  loadCart() {
    this.cartService.currentCart$.subscribe(cart => {
      if (cart)
        this.cart = cart;
    });
  }

  update() {
    this.loadCart();
  }

  delete(productId: string) {
    this.accountService.currentUser$.subscribe((user) => {
      this.cartService.deleteProduct(productId);
    });
  }

  updateCart() {
    this.cartService.updateCart();
    this.change = false;
    this.toastr.success('Update Cart Succesfully');
  }
}
