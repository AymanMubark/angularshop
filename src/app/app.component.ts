import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'E-Shop';
  loggedIn :boolean = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.setCurrentUser();
    this.getCurrentUser();
  }


  setCurrentUser() {
    const obj = localStorage.getItem("user");
    if (obj != null) {
      const user: User | null = JSON.parse(obj);
      if (user != null) {
        this.accountService.setCurrentUser(user);
      }
    }
  }

  getCurrentUser(){
    return this.accountService.currentUser$.subscribe(user=>{
      this.loggedIn = !!user;
    });
  } 
}
