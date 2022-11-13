import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from '../_models/cart';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private accountService: AccountService, private cartService: CartService, private router: Router) { }
  isLogined: boolean = false;
  user?: User | null;
  cart?: Cart;

  ngOnInit(): void {
    if (window.location.hash) {
      this.accountService.AuthorizedCallback();
    }
    this.accountService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.isLogined = true;
        this.cartService.currentCart$.subscribe((cart) => {
          if (cart)
            this.cart = cart;
        });
      }
    });
  }

  delete(productId: string) {
    this.cartService.deleteProduct(productId);
  }

  login() {
    this.accountService.login();
    this.router.navigateByUrl('/');
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
