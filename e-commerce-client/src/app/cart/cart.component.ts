import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CommonService } from '../services/common.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  
  displayProducts:any[];
  currentCustomer:string;
  commonService = inject(CommonService);
  customerService = inject(CustomerService);
  router = inject(Router);
  toast = inject(NgToastService);
  fb = inject(FormBuilder);
  totalAmount:number;
  addressForm: FormGroup;
  showAddressForm:boolean = false;
  addresses:any[] = [];

  ngOnInit(): void {
    this.totalAmount = 0;
    this.displayProducts = this.commonService.cartProducts;
    this.currentCustomer = this.commonService.loggedInUserId();
    this.displayProducts.forEach((pro)=>{
      this.totalAmount += pro.total;
    })
    
    this.addressForm = this.fb.group({
      existingAddress:[false],
      fullName: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      houseNo: ['', Validators.required],
      area: ['', Validators.required],
      landMark: [''],
      pinCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
  }
  
  onDelete(product:any){
    this.displayProducts = this.displayProducts.filter((pro)=>{
      return product.title !== pro.title;
    })
    this.commonService.cartProducts = this.commonService.cartProducts.filter((pro)=>{
      return product.title !== pro.title;
    })
    this.totalAmount -= product.price; 
    this.toast.error({
      detail: 'Removed from Cart',
      summary: `${product.title}`,
      position: 'topRight',
      duration: 5000
    });
  }

  decreaseAmount(product){
    let currentQuantity = product.selectedQuantity;
    let price = product.price;

    if(currentQuantity>0){
      product.selectedQuantity = currentQuantity - 1;
      product.total = (currentQuantity - 1)*price;
    }
    if(product.selectedQuantity === 0){
      this.onDelete(product);
    }

    this.totalAmount = 0;
    this.displayProducts.forEach((pro)=>{
      this.totalAmount += pro.total;
    })

  }

  increaseAmount(product){
    let currentQuantity = product.selectedQuantity;
    let price = product.price;

    product.selectedQuantity = currentQuantity + 1;
    product.total = (currentQuantity + 1)*price;
    
    this.totalAmount = 0;
    this.displayProducts.forEach((pro)=>{
      this.totalAmount += pro.total;
    })
  }

  placeOrder(){
    this.showAddressForm = true;
  }

  closePopUp(){
    this.showAddressForm = false;
  }

  closeOverLay(e:any){
    if(e.target.classList.contains("address-form")){
      this.closePopUp();
    }
  }

  onSubmit(){
    if(this.addressForm.valid || this.addressForm.value.existingAddress){
      let newAddress = this.addressForm.value;
      this.addresses.push(newAddress);
      if(confirm("Are you sure!? You want to place order?")){
        this.totalAmount = 0;
        this.displayProducts = [];
        this.commonService.cartProducts = [];
        this.addressForm.reset();
        this.closePopUp();
        this.toast.success({
          detail: 'Your Order placed Successfully',
          summary: `It will be delivered within a week`,
          position: 'topCenter',
          duration: 7000
        });
      }
    }
  }

  navigateBack(){
    this.router.navigate([`/customerprofile/${this.currentCustomer}`]);
  }
}
