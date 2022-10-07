import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  currentUser? : User;
  constructor(private accountService : AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers : any;
   this.accountService.currentUser$.pipe(take(1)).subscribe(user=>this.currentUser = user!);
    if(this.currentUser){
         headers = request.headers.set('Authorization',`Bearer ${this.currentUser.token}`);
      }
      return next.handle(request.clone({ headers }));
  }
}
