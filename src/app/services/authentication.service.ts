import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SubscriptionService } from './subscription.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  oldUserId;
  constructor(
    private http: HttpClient,
    private subscriptionService: SubscriptionService) {
    this.oldUserId = JSON.parse(localStorage.getItem('userId') || '{}');
  }

  public login(user: User) : any{
    return this.http.post<any>('https://localhost:5000/api/login', user)
      .pipe(map(response => {
        if (response && response.token) {
          this.oldUserId = JSON.parse(localStorage.getItem('userId') || '{}');
          localStorage.setItem('authToken', response.token);
          this.setUserDetails();
          localStorage.setItem('userId', response.userDetails.userId);
          this.subscriptionService.cartItemcount$.next(response.carItemCount);
        }

        return response;

      }));
  }

  public setUserDetails():void {
    if (localStorage.getItem('authToken')) {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(atob(localStorage.getItem('authToken')!.split('.')[1]));

      userDetails.userId = decodeUserDetails.userid;
      userDetails.username = decodeUserDetails.sub;
      userDetails.userTypeId = Number(decodeUserDetails.userTypeId);
      userDetails.isLoggedIn = true;

      this.subscriptionService.userData.next(userDetails);
    }
  }

  public  logout() : void{
    localStorage.clear();
    this.resetSubscription();
    this.setTempUserId();
  }

  public  setTempUserId() :void{
    if (!localStorage.getItem('userId')) {
      const tempUserID = this.generateTempUserId();
      localStorage.setItem('userId', tempUserID.toString());
    }
  }

  public  generateTempUserId(): number {
    return Math.floor(Math.random() * (99999 - 11111 + 1) + 12345);
  }

  public  resetSubscription() : void {
    this.subscriptionService.userData.next(new User());
    //FIXME need to include wishlist items.
    //this.subscriptionService.wishlistItem$.next([]);
    this.subscriptionService.wishlistItemcount$.next(0);
    this.subscriptionService.cartItemcount$.next(0);
  }
}
