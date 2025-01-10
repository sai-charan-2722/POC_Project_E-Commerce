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
  status:boolean = false;
  searchQuery:string;
  customerService = inject(CustomerService);
  sellerService = inject(SellerService);
  commonFunctions = inject(CommonService);
  ngOnInit(): void {
    this.customerService.getCustomerLoginStatus().subscribe({
      next: (loginStatus) => {
        this.status = loginStatus;
      }
    });
    this.sellerService.getSellerLoginStatus().subscribe({
      next: (loginStatus) => {
        this.status = loginStatus;
      }
    });
  }

  onSearch(){
    this.commonFunctions.setHomeSearch(this.searchQuery);
  }

  userLogout() {
    this.customerService.setCustomerLoginStatus(false);
    this.customerService.setCurrentCustomer({
      username: '',
      password: '',
      email: '',
      dob: ''
    });
    this.sellerService.setSellerLoginStatus(false);
    this.sellerService.setCurrentSeller({
      adminname: '',
      password: '',
      email: '',
      dob: ''
    });
    sessionStorage.removeItem('token');
  }

}
