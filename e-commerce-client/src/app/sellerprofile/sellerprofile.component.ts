import { Component, OnInit, effect, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Product } from '../models/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sellerprofile',
  templateUrl: './sellerprofile.component.html',
  styleUrl: './sellerprofile.component.css'
})
export class SellerprofileComponent implements OnInit{
  addProductForm!:FormGroup;
  displayProducts:any[]=[];
  isLoading:boolean=false;
  showAddProductForm:boolean=false;

  private apiUrl:string='https://fakestoreapi.com/products';

  constructor(private fb:FormBuilder, private http:HttpClient) {}

  ngOnInit():void{
    this.addProductForm=this.fb.group({
      title:['', Validators.required],
      price:['', [Validators.required, Validators.min(0)]],
      description:['',Validators.required],
      image:['', Validators.required]
    });
    this.loadProducts();
  }
  addProduct(): void{
    this.showAddProductForm=!this.showAddProductForm;
  }
  onSubmit():void{
    if(this.addProductForm.valid){
      const newProduct={
        title:this.addProductForm.value.title,
        price:this.addProductForm.value.price,
        description:this.addProductForm.value.description,
        image:this.addProductForm.value.image
      };

      this.isLoading=true;

      this.http.post(this.apiUrl, newProduct).subscribe(
        (response:any) => {
          this.displayProducts.push(response);
          this.isLoading=false;
          this.addProductForm.reset();
          this.addProduct();
        },
        (error)=> {
          console.error('Error adding product:',error);
          this.isLoading=false;          
        }
      );
    }
  }

  loadProducts():void{
    this.isLoading=true;
    this.http.get(this.apiUrl).subscribe(
      (products:any) => {
        this.displayProducts=products;
        this.isLoading=false;
      },
      (error) => {
        console.error('Error fetching products:',error);
        this.isLoading=false;
      }
    );
  }

  updateSeller(product:any):void{
    product.isEditing=!product.isEditing;
  }

  saveProduct(product:any):void{
    this.http.put(`${this.apiUrl}/${product.id}`,product).subscribe(
      (response:any) =>{
        console.log('Product updated successfully:',response);
        product.isEditing=false;
      },
      (error) =>{
        console.error('Error Updating product', error);
      }
    );
  }

  cancelEdit(product:any):void{
    product.isEditing=false;
    this.loadProducts();
  }

  removeProduct(productId:number):void{
    if(confirm('Are you sure you want to delete this product?')) {
      this.isLoading=true;

      this.http.delete(`${this.apiUrl}/${productId}`).subscribe(
        (response:any)=>{
          console.log('Product deleted successfully:');
          this.displayProducts=this.displayProducts.filter(
            (product)=>productId!==productId
          );
          this.isLoading=false;
        },
        (error) => {
          console.error('Error deleting product:',error);
          this.isLoading=false;  
        }
      );
    }
  }
}

