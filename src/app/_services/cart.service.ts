import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../_models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private currentcartSource = new BehaviorSubject<Cart[] | null>(null);
  currentCart$ = this.currentcartSource.asObservable();


  constructor(private toastr : ToastrService) { }

  addProduct(model: Cart) {
    let carts: Cart[] = [];
    if (localStorage.getItem('cart')) {
      carts = JSON.parse(localStorage.getItem('cart')!);
    }
    model.id = carts.length + 1;
    carts.push(model);
    localStorage.setItem('cart', JSON.stringify(carts));
    this.setCurrentCart();
  }

  deleteProduct(cartId: number) {
    let carts: Cart[] = [];
    if (localStorage.getItem('cart')) {
      carts = JSON.parse(localStorage.getItem('cart')!);
      carts = carts.filter(x => x.id != cartId);
      localStorage.setItem('cart', JSON.stringify(carts));
      this.setCurrentCart();
    }
  }

  setCurrentCart() {
    if (localStorage.getItem('cart')) {
      var cart = JSON.parse(localStorage.getItem('cart')!);
      this.currentcartSource.next(cart);
    }
  }
  
  update(cart:Cart[]) {
    localStorage.removeItem('cart');
    cart.forEach(element => {
      this.addProduct(element);     
    });
  }

}
