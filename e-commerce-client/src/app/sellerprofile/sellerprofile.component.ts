import { Component, OnInit, effect, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-sellerprofile',
  templateUrl: './sellerprofile.component.html',
  styleUrl: './sellerprofile.component.css'
})
export class SellerprofileComponent implements OnInit {
  addProductForm: FormGroup;
  searchQuery: string;
  allProducts: any[];
  displayProducts: any[] = [];
  showAddProductForm: boolean = false;
  toast = inject(NgToastService);


  constructor(private fb: FormBuilder, private commonService: CommonService, private sellerService:SellerService) {
    effect(() => {
      this.searchQuery = this.commonService.homeSearch();

      this.sellerService.getAllProducts().subscribe({
        next: (res) => {
          this.allProducts = res;

          if (this.searchQuery === "") {
            this.displayProducts = this.allProducts;
          }
          this.displayProducts = this.allProducts.filter((product) => {
            return product.title.toLowerCase().includes(this.searchQuery.toLowerCase());
          })
        },
        error:(err)=>{
          console.error("Error fetching products",err);
        }
      })
    })
   }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
  openPopUp(): void {
    this.showAddProductForm = true;
  }

  closePopUp(){
    this.showAddProductForm = false;
  }

  closeOverLay(e:any){
    if(e.target.classList.contains("product-form")){
      this.closePopUp();
    }
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      const newProduct = {
        title: this.addProductForm.value.title,
        price: this.addProductForm.value.price,
        description: this.addProductForm.value.description,
        image: this.addProductForm.value.image
      };

      this.commonService.addProduct(newProduct).subscribe({
        next: (response: any) => {
          this.displayProducts.push(response);
          this.addProductForm.reset();
          this.closePopUp();
          this.toast.success({
            detail: 'Product added successfully',
            summary: `${newProduct.title}`,
            position: 'topRight',
            duration: 5000
          });
        },
        error: (error) => {
          console.error('Error adding product:', error);
        }
      });
    }
  }

  updateSeller(product: any): void {
    product.isEditing = true;
  }

  saveProduct(product: any): void {
    this.commonService.updateProduct(product).subscribe({
      next:(response: any) => {
        console.log('Product updated successfully:', response);
        product.isEditing = false;
        this.toast.success({
          detail: 'Product updated successfully',
          summary: `${response.title}`,
          position: 'topRight',
          duration: 5000
        });
      },
      error:(error) => {
        console.error('Error Updating product', error);
      }
    });
  }

  cancelEdit(product: any): void {
    product.isEditing = false;
  }

  removeProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {

      this.displayProducts = this.displayProducts.filter(
        (pro) => pro.id !== productId
      );
      this.commonService.deleteProduct(productId).subscribe({
        next:(response: any) => {
          console.log('Product deleted successfully:',response);
          this.toast.error({
            detail: 'Product deleted successfully',
            summary: `${response.title}`,
            position: 'topRight',
            duration: 5000
          });
        },
        error:(error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  }
}

