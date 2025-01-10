import { Component, inject, effect } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrl: './customerprofile.component.css'
})
export class CustomerprofileComponent {

  commonService = inject(CommonService);
  toast = inject(NgToastService);
  searchQuery: string;
  allProducts: any[];
  displayProducts: any[];
  
  constructor(){
    effect(() => {
      this.searchQuery = this.commonService.homeSearch();
  
      this.commonService.getAllProducts().subscribe({
        next: (res) => {
          this.allProducts = res.products;
  
          if (this.searchQuery === "") {
            this.displayProducts = this.allProducts;
          }
          this.displayProducts = this.allProducts.filter((product) => {
            return product.title.toLowerCase().includes(this.searchQuery.toLowerCase());
          })
        }
      })
    })
  }

  onAdd(product:any){
    product['status'] = "CART";
    this.commonService.cartProducts.push(product);
    this.toast.success({
      detail: 'Added to Cart',
      summary: `${product.title}`,
      position: 'topRight',
      duration: 5000
    });
  }
}
