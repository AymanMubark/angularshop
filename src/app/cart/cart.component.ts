import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../_models/cart';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart? : Cart[];
  change : boolean =false;
  total : number = 0;
  constructor(private cartService: CartService,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(){
    this.cartService.currentCart$.subscribe(cart=>{
      if(cart){
        this.cart = cart;
      this.total = cart .reduce((sum, current) => sum + current.product.price * current.quantity, 0);
      }
    })
  }

  update(){
    console.log('dsds');
    if(this.total == this.cart!.reduce((sum, current) => sum + current.product.price * current.quantity, 0)){
      this.change  = false;
    }else{
      this.change  = true;
    }
    console.log(this.change);
  }
  delete(cart:Cart){
      this.cartService.deleteProduct(cart.id);
  }
  updateCart(){
    this.cartService.update(this.cart!);  
    this.total = this.cart!.reduce((sum, current) => sum + current.product.price * current.quantity, 0);
    this.change  = false;
    this.toastr.success('Update Cart Succesfully');
  }
}
