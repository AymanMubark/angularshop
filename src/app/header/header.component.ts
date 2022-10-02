import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(private accountService : AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }
  logout(){
    this.accountService.logout();
    this.getCurrentUser();
  }
  getCurrentUser(){
    return this.accountService.currentUser$.subscribe(user=>{
      this.loggedIn = !!user;
    });
  } 

}
