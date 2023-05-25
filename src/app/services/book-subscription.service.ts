
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BookSubscription } from '../models/booksubscription';
import { SubscriptionService } from './subscription.service';
import { Book } from '../models/book';


@Injectable({
  providedIn: 'root'
})
export class BookSubscriptionService {
  
  baseURL: string;

  constructor(private http: HttpClient,
              private subscriptionService: SubscriptionService) {
              this.baseURL = 'https://localhost:5000/api/bookSubscription/';
  }

 

  toggleBookSubscriptionItem(userId: number, bookId: number) {
    return this.http.post<Book[]>(this.baseURL + `ToggleBookSubscription/${userId}/${bookId}`, {})
      .pipe(map((response: Book[]) => {
        this.setBookSubscription(response);
        return response;
      }));
  }

  getBookSubscriptionItems(userId: number) {
    return this.http.get(this.baseURL + userId)
      .pipe(map((response: any) => {
        this.setBookSubscription(response);
        return response;
      }));
  }

  setBookSubscription(response: Book[]) {
    this.subscriptionService.wishlistItemcount$.next(response.length);
    this.subscriptionService.wishlistItem$.next(response);
  }

  clearBookSubscription(userId: number) {
    return this.http.delete<number>(this.baseURL + `${userId}`, {}).pipe(
      map((response: number) => {
        this.subscriptionService.wishlistItem$.next([]);
        return response;
      })
    );
  }
}