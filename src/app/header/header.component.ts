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
  cart: Cart[] = [];
  total: number = 0;

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user) => {
      this.user = user;
      this.isLogined = !!user;
    });
    this.cartService.currentCart$.subscribe((cart) => {
      if (cart) {
        this.cart = cart;
        this.total = cart.reduce((sum, current) => sum + current.product.price * current.quantity, 0);
      }
    });
  }
  delete(cart: Cart) {
    this.cartService.deleteProduct(cart.id);
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }



}
