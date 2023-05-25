import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'https://localhost:5000/api/user/';
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
