import { Component, OnInit } from '@angular/core';
import { Cart } from '../_models/cart';
import { Product } from '../_models/product';
import { CartService } from '../_services/cart.service';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products? : Product[];

  constructor(private productsService : ProductsService,private cartService : CartService) { }

  //Slider settings
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1} ;
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productsService.getProducts().subscribe(products=>{
      this.products = products;
    });
  }

  addToCart(product : Product){
    let cart : Cart = {
      id:0,
      product : product!,
      quantity :1
    };    
    this.cartService.addProduct(cart);
  }

}
