import { Component, inject, OnInit } from '@angular/core';
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
  totalAmount:number;

  ngOnInit(): void {
    this.totalAmount = 0;
    this.displayProducts = this.commonService.cartProducts;
    this.customerService.getCurrentCustomer().subscribe({
      next:(res)=>{this.currentCustomer = res.username}
    })
    this.displayProducts.forEach((pro)=>{
      this.totalAmount += pro.price; 
    })    
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
  navigateBack(){
    this.router.navigate([`/customerprofile/${this.currentCustomer}`]);
  }
}
