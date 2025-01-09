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

  getFakeProducts():Observable<any>{
    return this.httpClient.get("https://fakestoreapi.com/products");
  }

  getDummyProducts():Observable<any>{
    return this.httpClient.get("https://dummyjson.com/products")
  }


}
