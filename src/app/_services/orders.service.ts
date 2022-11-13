import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../_models/order';
import { orderAdd } from '../_models/orderAdd';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  addOrder(model : orderAdd) {
    return this.http.post(this.baseUrl + 'Basket/Checkout',model);
  }

  getOrderbyId(id : string) :Observable<Order> {
    return this.http.get<Order>(this.baseUrl + 'Orders/' + id);
  }


  getOrders(username :string) :Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'Orders/' + username);
  }
  
}
