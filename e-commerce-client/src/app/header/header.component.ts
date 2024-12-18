import { Component, inject, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { CustomerService } from '../services/customer.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  customerLoginStatus:boolean = false;
  sellerLoginStatus:boolean = false;
  status:boolean = false;
  searchQuery:string;
  customerService = inject(CustomerService);
  sellerService = inject(SellerService);
  commonFunctions = inject(CommonService);
  ngOnInit(): void {
    this.customerService.getCustomerLoginStatus().subscribe({
      next: (loginStatus) => {
        this.customerLoginStatus = loginStatus;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.sellerService.getSellerLoginStatus().subscribe({
      next: (loginStatus) => {
        this.sellerLoginStatus = loginStatus;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.status = this.customerLoginStatus || this.sellerLoginStatus;
  }

  onSearch(){
    this.commonFunctions.setHomeSearch(this.searchQuery);
  }

}
