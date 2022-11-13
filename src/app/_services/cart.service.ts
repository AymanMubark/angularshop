import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../_models/cart';
import { CartItem } from '../_models/cartItem';
import { Product } from '../_models/product';
import { ProductChoice } from '../_models/productChoice';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = environment.apiUrl;
  private currentCartSource = new BehaviorSubject<Cart | null>(null);
  currentCart$ = this.currentCartSource.asObservable();

  constructor(private http: HttpClient) { }

  getCart(name: string) {
    this.http.get<Cart>(this.baseUrl + 'Basket/' + name).subscribe((data) => {
      this.currentCartSource.next(data);
    });
  }


  updateCart() {
    const cart = this.currentCartSource.value;
    this.http.post<Cart>(this.baseUrl + 'Basket', cart).subscribe((cart) => {
      this.currentCartSource.next(cart);
    });
  }

  deleteProduct(productId: string) {
    this.currentCartSource.value!.items = this.currentCartSource.value!.items.filter(x => x.productId != productId);
    this.updateCart();
  }

  addProduct(product: Product, choices: ProductChoice[], quanity: number) {
    var newItem = true;
    this.currentCartSource.value?.items.forEach((item) => {
      if (item.choices == JSON.stringify(choices)) {
        quanity++;
        item.quantity = quanity;
        newItem = false;
      }
    })
    if (newItem) {
      let item: CartItem = {
        productId: product.id,
        productName: product?.name,
        productImageUrl: product.productImages[0].imageUrl,
        price: product.price,
        quantity: quanity,
        choices: JSON.stringify(choices),
      };
      this.currentCartSource.value?.items.push(item);
    }
    this.updateCart();
  }
}
