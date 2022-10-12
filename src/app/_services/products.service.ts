import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';
import { Product } from '../_models/product';
import { ProductSearch } from '../_models/productSearch';
import { Pagination, PaginationResult } from '../_models/paginationResult';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.apiUrl;
  paginationResult: PaginationResult<Product[]> = {};

  constructor(private http: HttpClient) { }

  getProducts(model?: any) {
    console.log(model);
    let httpParams = new HttpParams();
    if (model) {
      Object.keys(model).forEach(function (key) {
        if (model[key]) {
          httpParams = httpParams.append(key, model[key]);
        }
      });
    }
    return this.http.get<Product[]>(this.baseUrl + 'products', { observe: 'response', params: httpParams }).pipe(
      map(response => {
        if (response.body)
          this.paginationResult.result = response.body;
        if (response.headers.get('Pagination') != null)
          this.paginationResult.pagination = JSON.parse(response.headers.get('Pagination')!);
        return this.paginationResult;
      })
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getCategories(id?: string): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'categories?parentId=' + id);
  }

}
