import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/Customer';
import { Seller } from '../models/Seller';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  duplicateUserStatus: boolean = false;
  duplicateAdminStatus: boolean = false;
  router = inject(Router);
  customerService = inject(CustomerService);
  sellerService = inject(SellerService);
  toast = inject(NgToastService)
  fb: FormBuilder = inject(FormBuilder);
  registerForm:any;
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      registerType: 'customer',
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required]
    })
  }

  get username() {
    return this.registerForm.get('username')
  }
  get password() {
    return this.registerForm.get('password')
  }
  get email() {
    return this.registerForm.get('email')
  }
  get dob() {
    return this.registerForm.get('dob')
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      if (formData.registerType === 'customer') {
        let { username, password, email, dob } = this.registerForm.value;
        let newCustomer = new Customer(username, password, email, dob);
        this.customerService.createCustomer(newCustomer).subscribe({
          next: (res) => {
            // if (res.message === "Customer created") {
              console.log(res);
              this.router.navigate(['/login']);
              this.toast.success({
                detail: 'Registration done',
                summary: 'Registered as CUSTOMER',
                position: 'topRight',
                duration: 5000
              });
            // }
            // else {
            //   this.duplicateUserStatus = true;
            // }
          }, error: (err: any) => {
            console.log('error in customer creation', err);
          }
        });
      }
      else if (formData.registerType === 'seller') {
        let { username, password, email, dob } = this.registerForm.value;
        let newSeller = new Seller(username, password, email, dob);
        this.sellerService.createSeller(newSeller).subscribe({
          next: (res) => {
            // if (res.message === "Seller created") {
              console.log(res);
              this.router.navigate(['/login']);
              this.toast.success({
                detail: 'Registration done',
                summary: 'Registered as SELLER',
                position: 'topRight',
                duration: 5000
              });
            // }
            // else {
            //   this.duplicateAdminStatus = true;
            // }
          }, error: (err:any) => {
            console.log('error in seller creation', err);
          }
        });
      }
      else {
        console.log('form is invalid');
      }
    }
  }
}
