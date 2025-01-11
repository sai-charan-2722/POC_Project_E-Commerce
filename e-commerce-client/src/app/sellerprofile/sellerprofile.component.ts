import { Component, OnInit, effect, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sellerprofile',
  templateUrl: './sellerprofile.component.html',
  styleUrl: './sellerprofile.component.css'
})
export class SellerprofileComponent implements OnInit {
  addProductForm!: FormGroup;
  displayProducts: any[] = [];
  showAddProductForm: boolean = false;


  constructor(private fb: FormBuilder, private commonService: CommonService) { }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
    this.loadProducts();
  }
  openPopUp(): void {
    this.showAddProductForm = true;
  }

  closePopUp(){
    this.showAddProductForm = false;
  }

  closeOverLay(e:any){
    if(e.target.classList.contains("product-form")){
      this.showAddProductForm = false;
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
        },
        error: (error) => {
          console.error('Error adding product:', error);
        }
      });
    }
  }

  loadProducts(): void {
    this.commonService.getAllProducts().subscribe({
      next:(products: any) => {
        this.displayProducts = products;
      },
      error:(error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  updateSeller(product: any): void {
    product.isEditing = true;
  }

  saveProduct(product: any): void {
    this.commonService.updateProduct(product).subscribe({
      next:(response: any) => {
        console.log('Product updated successfully:', response);
        product.isEditing = false;
      },
      error:(error) => {
        console.error('Error Updating product', error);
      }
    });
  }

  cancelEdit(product: any): void {
    product.isEditing = false;
    this.loadProducts();
  }

  removeProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {

      this.commonService.deleteProduct(productId).subscribe({
        next:(response: any) => {
          console.log('Product deleted successfully:',response);
          this.displayProducts = this.displayProducts.filter(
            (pro) => pro.id !== productId
          );
        },
        error:(error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  }
}

