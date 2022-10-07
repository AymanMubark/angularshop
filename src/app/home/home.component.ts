import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/product';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products? : Product[];

  constructor(private productsService : ProductsService) { }

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

}
