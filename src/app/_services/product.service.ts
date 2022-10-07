import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "https://localhost:7036/api/";

  constructor(private http : HttpClient) { }
getProducts(){
  return this.http.get(this.baseUrl+'/product').pipe();
}
}
