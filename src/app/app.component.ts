import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { BusyService } from './_services/busy.service';
import { CartService } from './_services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'E-Shop';
  loggedIn: boolean = false;
  loading?: boolean = false;
  constructor(private cdr: ChangeDetectorRef, private accountService: AccountService, private cartService: CartService, private busyService: BusyService) { }

  ngOnInit(): void {
    this.busyService.loading$.subscribe((value) => this.loading = value);
    this.accountService.setCurrentUser();
    this.accountService.currentUser$.subscribe(user => {
      if (user) {
        this.cartService.getCart(user?.unique_name!);
      }
    })
  }



  getCurrentUser() {
    return this.accountService.currentUser$.subscribe(user => {
      this.loggedIn = !!user;
    });
  }
  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }
}
