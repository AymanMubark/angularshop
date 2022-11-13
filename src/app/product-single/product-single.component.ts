import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../_models/cart';
import { Choice } from '../_models/choice';
import { Product } from '../_models/product';
import { ProductChoice } from '../_models/productChoice';
import { AccountService } from '../_services/account.service';
import { CartService } from '../_services/cart.service';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {
  product?: Product;
  productQuantity?: number = 1;
  Colors: ProductChoice[] = [];
  Sizes: ProductChoice[] = [];
  selectedSize?: ProductChoice;
  selectedColor?: ProductChoice;
  constructor(private route: ActivatedRoute, private accountService: AccountService, private productsService: ProductsService, private cartService: CartService, private toastr: ToastrService) { }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.loadProduct(params['id']);
    });
  }

  loadProduct(id: string) {
    this.productsService.getProduct(id).subscribe(product => {
      this.product = product;
      for (const productChoice of product.productChoices) {
        if (productChoice.choice.choiceCategory.name == "Color") {
          this.Colors?.push(productChoice);
        } else if (productChoice.choice.choiceCategory.name == "Size") {
          this.Sizes.push(productChoice);
        }
      }
      if (this.product?.productChoices!.filter(ch => ch.choice.choiceCategory.name == "Size")[0]) {
        this.selectedSize = this.product?.productChoices!.filter(ch => ch.choice.choiceCategory.name == "Size")[0];
      }
      if (this.product?.productChoices!.filter(ch => ch.choice.choiceCategory.name == "Color")[0]) {
        this.selectedColor = this.product?.productChoices!.filter(ch => ch.choice.choiceCategory.name == "Color")[0];
      }
    });
  }

  selectColor(choice: ProductChoice) {
    this.selectedColor = choice;
  }

  addToCart() {

    var choices: ProductChoice[] = [];

    if (this.selectedSize) {
      choices.push(this.selectedSize);
    } else {
      if (this.product?.productChoices!.filter(ch => ch.choice.choiceCategory.name == "Size")[0]) {
        choices.push(this.product?.productChoices!.filter(ch => ch.choice.choiceCategory.name == "Size")[0]);
      }
    }

    if (this.selectedColor) {
      choices.push(this.selectedColor);
    } else {
      if (this.product?.productChoices!.filter(ch => ch.choice.choiceCategory.name == "Color")[0]) {
        choices.push(this.product?.productChoices!.filter(ch => ch.choice.choiceCategory.name == "Color")[0]);
      }
    }

    this.cartService.addProduct(this.product!, choices, 1);
    this.toastr.success('Add to cart');
  }
}
