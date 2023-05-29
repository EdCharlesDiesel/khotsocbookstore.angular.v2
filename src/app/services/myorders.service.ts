import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MyordersService {
  baseURL = environment.baseURL + "Order";
  constructor(private http: HttpClient) {
  }

  myOrderDetails(userId: number) {
    return this.http.get(this.baseURL + userId);
  }
}
