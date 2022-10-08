import { Component, OnInit } from '@angular/core';
import { Address } from '../_models/address';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  address?: Address;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadAddress();
  }

  loadAddress() {
    this.accountService.getUserAddress().subscribe(address => {
      this.address = address;
    });
  }
}
