import { Component, inject, effect } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CommonService } from '../services/common.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrl: './customerprofile.component.css'
})
export class CustomerprofileComponent {

  commonService = inject(CommonService);
  customerService=inject(CustomerService);
  toast = inject(NgToastService);
  searchQuery: string;
  allProducts: any[];
  displayProducts: any[];
  
  constructor(){
    effect(() => {
      this.searchQuery = this.commonService.homeSearch();
  
      this.customerService.getAllProducts().subscribe({
        next: (res) => {
          this.allProducts = res;
  
          if (this.searchQuery === "") {
            this.displayProducts = this.allProducts;
            return;
          }else{
            this.commonService.findProduct(this.searchQuery).subscribe({
              next:(res)=>{
                this.displayProducts = res;
              }
            })
          }
        }
      })
    })
  }

  onAdd(product:any){
    product['status'] = "CART";
    product['total'] = product.price;
    product['selectedQuantity'] = 1;
    this.commonService.cartProducts.push(product);
    this.toast.success({
      detail: 'Added to Cart',
      summary: `${product.title}`,
      position: 'topRight',
      duration: 5000
    });
  }
}
