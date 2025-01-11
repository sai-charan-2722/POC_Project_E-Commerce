import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Injectable, signal} from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  httpClient = inject(HttpClient);
  homeSearch= signal("");
  cartProducts:any[] = [];

  setHomeSearch(value:any){
    this.homeSearch.set(value);
  }

  getAllProducts():Observable<any>{
    return this.httpClient.get("http://localhost:8080/api/admin/products/all");
  }

  addProduct(newProduct:any):Observable<any>{
    return this.httpClient.post("http://localhost:8080/api/admin/products/add",newProduct);
  }

  updateProduct(product:any):Observable<any>{
    return this.httpClient.put(`http://localhost:8080/api/admin/products/update/${product.id}`,product);
  }

  deleteProduct(productId:any):Observable<any>{
    return this.httpClient.delete(`http://localhost:8080/api/admin/products/remove/${productId}`);
  }
}
