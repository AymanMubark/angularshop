import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Address } from '../_models/address';
import { UserDetails } from '../_models/userDetails';
import { StorageService } from './storage.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  baseUrl = environment.apiUrl;
  authorityUrl = environment.authorityUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  IsAuthorized = false;

  constructor(private http: HttpClient, private router: Router, private storageService: StorageService) {
    if (storageService.retrieve('IsAuthorized') !== '') {
      this.IsAuthorized = storageService.retrieve('IsAuthorized');
      this.currentUserSource.next(this.storageService.retrieve('userData'));
    }
  }

  public SetAuthorizationData(token: any, id_token: any) {
    if (this.storageService.retrieve('authorizationData') !== '') {
      this.storageService.store('authorizationData', '');
    }

    this.storageService.store('authorizationData', token);
    this.storageService.store('authorizationDataIdToken', id_token);
    this.IsAuthorized = true;
    this.storageService.store('IsAuthorized', true);

    this.getUserData()
      .subscribe((data) => {
        this.storageService.store('userData', data);
        this.setCurrentUser();
        window.location.href = location.origin;
      });
  }

  private getUserData = (): Observable<string[]> => {
    return this.http.get(`${this.authorityUrl}connect/userinfo`)
      .pipe<string[]>((info: any) => info);
  }

  public ResetAuthorizationData() {
    this.storageService.store('authorizationData', '');
    this.storageService.store('authorizationDataIdToken', '');
    this.storageService.store('userData', '');

    this.IsAuthorized = false;
    this.storageService.store('IsAuthorized', false);
  }

  login() {
    this.ResetAuthorizationData();

    let authorizationUrl = this.authorityUrl + 'connect/authorize';
    let client_id = 'js';
    let redirect_uri = location.origin + '/';
    let response_type = 'id_token token';
    let scope = 'openid profile orders basket webshoppingagg orders.signalrhub';
    let nonce = 'N' + Math.random() + '' + Date.now();
    let state = Date.now() + '' + Math.random();

    this.storageService.store('authStateControl', state);
    this.storageService.store('authNonce', nonce);

    let url =
      authorizationUrl + '?' +
      'response_type=' + encodeURI(response_type) + '&' +
      'client_id=' + encodeURI(client_id) + '&' +
      'redirect_uri=' + encodeURI(redirect_uri) + '&' +
      'scope=' + encodeURI(scope) + '&' +
      'nonce=' + encodeURI(nonce) + '&' +
      'state=' + encodeURI(state);

    window.location.href = url;
  }


  public AuthorizedCallback() {
    this.ResetAuthorizationData();

    let hash = window.location.hash.substr(1);

    let result: any = hash.split('&').reduce(function (result: any, item: string) {
      let parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, {});

    console.log(result);

    let token = '';
    let id_token = '';
    let authResponseIsValid = false;

    if (!result.error) {

      if (result.state !== this.storageService.retrieve('authStateControl')) {
        console.log('AuthorizedCallback incorrect state');
      } else {

        token = result.access_token;
        id_token = result.id_token;

        let dataIdToken: any = this.getDataFromToken(id_token);

        // validate nonce
        if (dataIdToken.nonce !== this.storageService.retrieve('authNonce')) {
          console.log('AuthorizedCallback incorrect nonce');
        } else {
          this.storageService.store('authNonce', '');
          this.storageService.store('authStateControl', '');

          authResponseIsValid = true;
          console.log('AuthorizedCallback state and nonce validated, returning access token');
        }
      }
    }

    if (authResponseIsValid) {
      this.SetAuthorizationData(token, id_token);
    }
  }


  private getDataFromToken(token: any) {
    let data = {};

    if (typeof token !== 'undefined') {
      let encoded = token.split('.')[1];

      data = JSON.parse(this.urlBase64Decode(encoded));
    }

    return data;
  }
  private urlBase64Decode(str: string) {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }

    return window.atob(output);
  }
  public GetToken(): string {
    return this.storageService.retrieve('authorizationData');
  }

  // register(model: any) {
  //   return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
  //     map((response) => {
  //       const user = response;
  //       if (user) {
  //         localStorage.setItem("user", JSON.stringify(user));
  //         this.currentUserSource.next(user);
  //       }
  //     })
  //   );
  // }

  setCurrentUser() {
    const user : User = this.storageService.retrieve("userData");
    this.currentUserSource.next(user);
  }


  updateUserAddress(model: any) {
    // return this.http.put(this.baseUrl + 'account/address/me', model);
  }

  updateUserProfile(model: any) {
    // return this.http.put(this.baseUrl + 'account/me', model);
  }

  getUserAddress():any {
    // return this.http.get<Address>(this.baseUrl + 'account/address/me');
  }

  getUserDetails(): any {
    // return this.http.get<UserDetails>(this.baseUrl + 'account/me');
  }

  logout() {
    let authorizationUrl = this.authorityUrl + 'connect/endsession';
    let id_token_hint = this.storageService.retrieve('authorizationDataIdToken');
    let post_logout_redirect_uri = location.origin + '/';
console.log(post_logout_redirect_uri);
    let url =
        authorizationUrl + '?' +
        'id_token_hint=' + encodeURI(id_token_hint) + '&' +
        'post_logout_redirect_uri=' + encodeURI(post_logout_redirect_uri);

    this.ResetAuthorizationData();

    // emit observable
    this.currentUserSource.next(null);
    window.location.href = url;
  }
}
