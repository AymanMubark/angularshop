import { Component, OnInit } from '@angular/core';
import { Order } from '../_models/order';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { OrdersService } from '../_services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  user: User | undefined;
  constructor(private ordersService: OrdersService,private accountService : AccountService) { }

  ngOnInit(): void {
    this.loadOrders();
  }
  
  loadOrders() {
    this.accountService.currentUser$.subscribe((user)=>{
      if(user)
      this.ordersService.getOrders(user?.unique_name).subscribe(orders => {
        if (orders) {
          this.orders = orders;
        }
      })
    });

  }
}
