import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  model: any = {};
  user? :User;
  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadUser();
  }
  updateProfle() {
    console.log(this.model);
    // this.accountService.updateUserProfile(this.model).subscribe(() => {
    //   this.toastr.success('Update Profile Succfully');
    // });
  }

  loadUser() {
    this.accountService.currentUser$.subscribe(user => {
      if(user)
    this.user = user;
    })
}
}
