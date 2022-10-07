import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_models/product';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {
  product? : Product;
  constructor(private route: ActivatedRoute,private productsService : ProductsService) { }

  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.loadProduct(params['id']);
    });
  }

  loadProduct(id:string){
    this.productsService.getProduct(id).subscribe(product=>{
      this.product = product;
    });
  }

}
