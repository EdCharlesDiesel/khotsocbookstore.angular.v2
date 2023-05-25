import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { BookSubscription } from 'src/app/models/booksubscription';
import { BookSubscriptionService } from 'src/app/services/book-subscription.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-book-subscription',
  templateUrl: './book-subscription.component.html',
  styleUrls: ['./book-subscription.component.scss']
})
export class BookSubscriptionComponent implements OnInit {
  bookSubscriptionItems$: Observable<Book[]>;
  isLoading: boolean;
  userId;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private subscriptionService: SubscriptionService,
    private bookSubscriptionService: BookSubscriptionService,
    private snackBarService: SnackbarService) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getBookSubscriptionItems();
  }

  getBookSubscriptionItems() {
    this.bookSubscriptionItems$ = this.subscriptionService.bookSubscriptionItem$;
    this.isLoading = false;
  }

  clearBookSubscription() {
    this.bookSubscriptionService.clearBookSubscription(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.bookSubscriptionItemcount$.next(result);
          this.snackBarService.showSnackBar('BookSubscription cleared!!!');
          //this.getShoppingCartItems();
        }, error => {
          console.log('Error ocurred while deleting bookSubscription item : ', error);
        });
  }
}