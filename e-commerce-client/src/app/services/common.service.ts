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

}
