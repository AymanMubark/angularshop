import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../_models/cart';
import { Choice } from '../_models/choice';
import { Product } from '../_models/product';
import { ProductChoice } from '../_models/productChoice';
import { CartService } from '../_services/cart.service';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {
  product? : Product;
  productQuantity? : number = 1;
  Colors : Choice[] = [];
  Sizes : Choice[] =[];

  constructor(private route: ActivatedRoute,private productsService : ProductsService,private cartService : CartService,private toastr : ToastrService) { }
  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      this.loadProduct(params['id']);
    });
  }

  loadProduct(id:string){
    this.productsService.getProduct(id).subscribe(product=>{
      this.product = product;
      for (const productChoice of product.productChoices) {
        if(productChoice.choice.choiceCategory.name == "Color"){
          this.Colors?.push(productChoice.choice);
        }else if(productChoice.choice.choiceCategory.name == "Size"){
          this.Sizes.push(productChoice.choice);
        }
      }
    });
  }
  addToCart(){
    let cart : Cart = {
      id:0,
      product : this.product!,
      quantity :this.productQuantity!
    };    
    this.cartService.addProduct(cart);
    this.toastr.success('Add to cart');
  }
}
