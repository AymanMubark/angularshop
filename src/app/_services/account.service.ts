import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, ReplaySubject } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Address } from '../_models/address';
import { UserDetails } from '../_models/userDetails';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();



  constructor(private http: HttpClient ,private router : Router) {

  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response)=>{
        const user = response;
        if(user){
          localStorage.setItem("user",JSON.stringify(user));
          this.currentUserSource.next(user);
        }
    })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((response)=>{
        const user = response;
        if(user){
          localStorage.setItem("user",JSON.stringify(user));
          this.currentUserSource.next(user);
        }
    })
    );
  }

  setCurrentUser(user : User){
    this.currentUserSource.next(user);
  }


  updateUserAddress(model : any){
    return this.http.put(this.baseUrl + 'account/address/me',model);
  }

  updateUserProfile(model : any){
    return this.http.put(this.baseUrl + 'account/me',model);
  }

  getUserAddress() : Observable<Address>{
    return this.http.get<Address>(this.baseUrl + 'account/address/me');
  }
  
  getUserDetails() : Observable<UserDetails>{
    return this.http.get<UserDetails>(this.baseUrl + 'account/me');
  }
  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
