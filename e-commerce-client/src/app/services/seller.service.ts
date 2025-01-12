import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Seller } from '../models/Seller';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  httpClient = inject(HttpClient)

  sellerLoginStatus = new BehaviorSubject<boolean>(false);
  private apiUrl='https://locahost:8080/api/admin/products/update';

  getSellerLoginStatus(): Observable<any> {
    return this.sellerLoginStatus.asObservable();
  }

  setSellerLoginStatus(value: boolean) {
    this.sellerLoginStatus.next(value);
  }

  currentSeller = new BehaviorSubject<Seller>({
    adminname: '',
    password: '',
    email: '',
    dob: ''
  });

  getCurrentSeller(): Observable<Seller> {
    return this.currentSeller.asObservable();
  }

  setCurrentSeller(customer: Seller) {
    this.currentSeller.next(customer);
  }

  createSeller(newSeller: Seller): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/admin/register', newSeller)
  }

  sellerLogin(credobj:any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/admin/login', credobj)
  }

  getAllProducts():Observable<any>{
    return this.httpClient.get("http://localhost:8080/api/admin/products/all")
  }

  updateSeller(productId:number, product:any): Observable<any>{
    return this.httpClient.put(`${this.apiUrl}/${productId}`, product)
  }

  removeProduct(productId:number):Observable<any>{
    return this.httpClient.delete(`http://localhost:8080/api/admin/products/remove/${productId}`)
  }

  addProduct(product:Product) :Observable<any>{
    return this.httpClient.post(`http://localhost:8080/api/admin/products/add`,product)
  }
}
