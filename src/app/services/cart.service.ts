import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemCount = 0;
  baseURL = environment.baseURL + "shoppingcart";

  constructor(private http: HttpClient) {

  }

  addBookToCart(userId: number, bookId: any) {
    return this.http.post<number>(this.baseURL + `addToCart/${userId}/${bookId}`, {});
  }

  getCartItems(userId: number) {
    return this.http.get(this.baseURL + userId)
      .pipe(map((response: any) => {
        this.cartItemCount = response.length;
        return response;
      }));
  }

  removeCartItems(userId: string, bookId: string) {
    return this.http.delete<string>(this.baseURL + `${userId}/${bookId}`, {});
  }

  deleteOneCartItem(userId: string, bookId: string) {
    return this.http.put<string>(this.baseURL + `${userId}/${bookId}`, {});
  }

  clearCart(userId: string) {
    return this.http.delete<string>(this.baseURL + `${userId}`, {});
  }

  setCart(oldUserId: string, newUserId: string) {
    return this.http.get(this.baseURL + `setShoppingCart/${oldUserId}/${newUserId}`, {})
      .pipe(map((response: any) => {
        this.cartItemCount = response;
        return response;
      }));
  }
}
