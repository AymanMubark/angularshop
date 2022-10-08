import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../_models/address';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  address?: Address;

  constructor(private accountService: AccountService,private router : Router) { }

  ngOnInit(): void {
    this.loadAddress();
  }

  loadAddress() {
    this.accountService.getUserAddress().subscribe(address => {
      this.address = address;
    });
  }

  updateAddres() {
    this.accountService.updateUserAddress(this.address).subscribe(address => {
      this.router.navigateByUrl('/address');
    });
  }
}
