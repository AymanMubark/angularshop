import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private accountService : AccountService,private router: Router) { }
  isLogined:boolean = false;
  user?:User | null;

  ngOnInit(): void {
      this.accountService.currentUser$.subscribe((user)=>{
      this.user = user;
      this.isLogined = !!user;
    });
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }



}
