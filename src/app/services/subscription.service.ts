import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Book } from '../components/book/book';
import {User} from "../components/user-login/user";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  userData = new BehaviorSubject<Book>(new Book());
  bookDetails$ = new BehaviorSubject<User>(new User());
  searchItemValue$ = new BehaviorSubject<string>('');
  wishlistItemcount$ = new Subject<number>();
  wishlistItem$ = new BehaviorSubject<Book[]>([]);
  cartItemcount$ = new Subject<number>();
  bookSubItemcount$ = new Subject<number>();
  bookSubscriptionItem$ = new BehaviorSubject<Book[]>([]);
  bookSubscriptionItemcount$ = new Subject<number>();
}
