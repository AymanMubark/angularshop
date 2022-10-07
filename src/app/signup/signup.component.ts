import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model : any = {};
  validationErrors : string[] = [];
  constructor(private accountService : AccountService,private router : Router,private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe((response) => {
      this.router.navigateByUrl('/');
    },error=>{
      this.validationErrors = error;
    });
  }

}
