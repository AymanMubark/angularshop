import { Component, OnInit } from '@angular/core';
import { Order } from '../_models/order';
import { OrdersService } from '../_services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.loadOrders();
  }
  
  loadOrders() {
    this.ordersService.getOrders().subscribe(orders => {
      if (orders) {
        this.orders = orders;
      }
    })
  }
}
