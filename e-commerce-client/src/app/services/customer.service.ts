import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  httpClient = inject(HttpClient)

  customerLoginStatus = new BehaviorSubject<boolean>(false);

  getCustomerLoginStatus(): Observable<any> {
    return this.customerLoginStatus.asObservable();
  }

  setCustomerLoginStatus(value: boolean) {
    this.customerLoginStatus.next(value);
  }

  currentCustomer = new BehaviorSubject<Customer>({
    username: '',
    password: '',
    email: '',
    dob: ''
  });

  getCurrentCustomer(): Observable<Customer> {
    return this.currentCustomer.asObservable();
  }

  setCurrentCustomer(customer: Customer) {
    this.currentCustomer.next(customer);
  }

  createCustomer(newCustomer: Customer): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/users/register', newCustomer)
  }

  customerLogin(credobj:any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/users/login', credobj)
  }
  getAllProducts():Observable<any>{
    return this.httpClient.get("http://localhost:8080/api/users/products/all")
  }

}
