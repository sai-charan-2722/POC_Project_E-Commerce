import { effect } from '@angular/core';
import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  commonService = inject(CommonService)
  searchQuery: string;
  allProducts: any[];
  displayProducts: any[];

  ngOnInit(): void {
    
  }

  constructor() {

    effect(() => {
      this.searchQuery = this.commonService.homeSearch();

      this.commonService.getAllProducts().subscribe({
        next: (res) => {
          this.allProducts = res;

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



}
