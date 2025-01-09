import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CustomerService } from '../services/customer.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  fb: FormBuilder = inject(FormBuilder);
  customerService = inject(CustomerService);
  sellerService = inject(SellerService);
  toast = inject(NgToastService);
  router = inject(Router);

  userCredentialsError = {
    userCredErrStatus: false,
    userCredErrMsg: ""
  }

  userCredentials:any;

  ngOnInit(): void {
    this.userCredentials = this.fb.group({
      loginType: 'customer',
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get email() {
    return this.userCredentials.get('email')
  }
  get password() {
    return this.userCredentials.get('password')
  }

  onSubmitUser() {
    let formData = this.userCredentials.value;
    if (formData.loginType === 'customer') {
      this.customerService.customerLogin(formData).subscribe({
        next: (res) => {
          if (res.message === 'Login successfull') {
            sessionStorage.setItem('token', res.token);
            this.customerService.setCustomerLoginStatus(true);
            this.customerService.setCurrentCustomer(res.user);
            this.router.navigate([`/customerprofile/${res.user.username}`]);
            this.toast.success({
              detail: 'Login Successful',
              summary: 'LoggedIn as CUSTOMER',
              position: 'topRight',
              duration: 5000
            });
          }
          else {
            this.userCredentialsError = {
              userCredErrStatus: true,
              userCredErrMsg: res.message
            }
          }
        }, error: (error) => {
          console.log('err in user login', error);
        }
      });
    }
    else {
      this.sellerService.sellerLogin(formData).subscribe({
        next: (res) => {
          if (res.message === 'Login successfull') {
            sessionStorage.setItem('token', res.token);
            this.sellerService.setSellerLoginStatus(true);
            this.sellerService.setCurrentSeller(res.user);
            this.router.navigate([`/sellerprofile/${res.user.adminname}`]);
            this.toast.success({
              detail: 'Login Successful',
              summary: 'LoggedIn as SELLER',
              position: 'topRight',
              duration: 5000
            });
          }
          else {
            this.userCredentialsError = {
              userCredErrStatus: true,
              userCredErrMsg: res.message
            }
          }
        }, error: (error) => {
          console.log('err in admin login', error);
        }
      });
    }
  }
}
