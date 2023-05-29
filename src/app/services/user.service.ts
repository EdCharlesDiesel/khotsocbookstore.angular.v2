import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL= environment.baseURL + 'users'

  constructor(private http: HttpClient) {
  }

  // registerUser(userdetails: any,password: any) {
  //   return this.http.post(this.baseURL, userdetails + password);
  // }

  registerUser(userdetails: any) {
    return this.http.post(this.baseURL, userdetails);
   }

  getCartItemCount(userId: number) {
    return this.http.get<number>(this.baseURL + userId);
  }

  validateUserName(userName: string) {
    return this.http.get(this.baseURL + 'validateUserName/' + userName);
  }
}
