import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Cart } from '../_models/cart';
import { Product } from '../_models/product';
import { CategoryTree } from '../_models/categoriesTree';
import { CartService } from '../_services/cart.service';
import { ProductsService } from '../_services/products.service';
import { Observable } from 'rxjs';
import { Category } from '../_models/category';
import { ProductSearch } from '../_models/productSearch';
import { Pagination } from '../_models/paginationResult';
import { ToastrService } from 'ngx-toastr';
import { Choice } from '../_models/choice';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categoriesTree: TreeNode[] = [];
  products?: Product[];
  pagination?: Pagination;
  model: ProductSearch = {
    searchKey: '',
    pageNumber: 1,
    pageSize: 50,
    sortBy: "",

  };
  rangeValues: number[] = [0, 10000];
  selectedCategory?: TreeNode;
  Colors: Choice[] = [];
  Sizes: Choice[] = [];

  constructor(private cartService: CartService, private productsService: ProductsService, private toastr: ToastrService) { }



  ngOnInit() {
    this.loadCategoies();
    this.loadProducts();
  }

  onSortChange(evnet: any) {
    this.search();
  }
  changePrice(event: any) {
    if (event) {
      console.log(event);
      //this.search();
      this.model.minPrice = event.values[0];
      this.model.maxPrice = event.values[1];
      this.search();
    }
  }
  AddToChoices(choice: Choice) {
    console.log(choice);
    if (choice) {
      if (!this.model.choicesId) {
        this.model.choicesId = [];
      }
      if (!this.model.choicesId.some(x => x == choice.id)) {
        this.model.choicesId.push(choice.id);
      } else {
        var index = this.model.choicesId.findIndex(x => x == choice.id);
        if (index !== -1)
          this.model.choicesId.splice(index, 1)
      }
      if (this.model.choicesId!.length < 1) {
        this.model.choicesId = null;
      }
    }

    this.search();
  }

  public checkChoice(choice: Choice): boolean {
    if (!this.model.choicesId) {
      return false;
    }
    return this.model.choicesId!.some(x => x == choice.id);
  }

  search() {
    this.model.categoryId = this.selectedCategory?.data ?? "";
    this.loadProducts();
  }

  categoryExpand(event: any) {
    if (event.node) {
      if (event.node.data != '') {
        this.getCategories(event.node.data).subscribe(categoies => {
          event.node.children = [];
          for (let category of categoies) {
            let categoryNode: CategoryTree = {
              data: category.id,
              label: category.name,
              expandedIcon: "pi pi-plus",
              collapsedIcon: "pi pi-plus-circle",
            };
            if (category.count > 0)
              categoryNode.children = [{}];
            event.node.children.push(categoryNode);
          }
        });
      }
    }
  }

  nodeSelect(event: any) {
    this.selectedCategory = event.node;
    this.search();
  }

  paginate(event: any) {
    if (event) {
      this.model.pageNumber = event.page + 1;
      this.model.pageSize = event.rows;
      this.search();
    }
  }

  getCategories(parent = ''): Observable<Category[]> {
    if (this.selectedCategory) {
      parent = this.selectedCategory.key ?? '';
    }
    return this.productsService.getCategories(parent);
  }

  loadCategoies() {
    this.getCategories().subscribe(categoies => {
      for (let category of categoies) {
        let categoryNode: CategoryTree = {
          data: category.id,
          label: category.name,
          expandedIcon: "pi pi-plus",
          collapsedIcon: "pi pi-plus-circle",
        };
        if (category.count > 0)
          categoryNode.children = [{}];
        this.categoriesTree.push(categoryNode);
      }
    });
  }

  loadProducts() {
    this.productsService.getProducts(this.model).subscribe(response => {
      if (response) {
        if (response.result) {
          this.products = response.result;
          this.pagination = response.pagination;
          for (const product of this.products) {
            for (const productChoice of product.productChoices) {
              if (productChoice.choice.choiceCategory.name == "Color") {
                if (!this.Colors.some(x => x.id == productChoice.choice.id))
                  this.Colors?.push(productChoice.choice);
              }
              else if (productChoice.choice.choiceCategory.name == "Size") {
                if (!this.Sizes.some(x => x.id == productChoice.choice.id))
                  this.Sizes.push(productChoice.choice);
              }
            }
          }
        }
      }
    });
  }

  addToCart(product: Product) {
    let cart: Cart = {
      id: 0,
      product: product!,
      quantity: 1
    };
    this.cartService.addProduct(cart);
    this.toastr.success('Add to cart');
  }

}
