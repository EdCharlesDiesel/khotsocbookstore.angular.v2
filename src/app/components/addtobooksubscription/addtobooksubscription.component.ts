import { SnackbarService } from './../../services/snackbar.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { Book } from '../book/book';
import { Component, Input, OnInit } from '@angular/core';
import { BookSubscriptionService } from 'src/app/services/book-subscription.service';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-addtobooksubscription',
  templateUrl: './addtobooksubscription.component.html',
  styleUrls: ['./addtobooksubscription.component.scss']
})
export class AddtobooksubscriptionComponent implements OnChanges {

  @Input() bookId?: any;

  @Input() showButton?:boolean;

  userId;
  toggle: boolean = false;
  buttonText!: string;
  public wishlistItems: Book[] = [];

  constructor(
    private bookSubscriptionService: BookSubscriptionService,
    private subscriptionService: SubscriptionService,
    private snackBarService: SnackbarService) {
    this.userId = JSON.parse(localStorage.getItem('userId')||'{}') ;

  }

  ngOnChanges() {
    this.subscriptionService.bookSubscriptionItem$
    .pipe().subscribe(
      (bookData: Book[]) => {
        this.setButtonText();
      });
  }


  setButtonText() {
    if (this.toggle) {
      this.buttonText = 'Remove from BookSubscription';
    } else {
      this.buttonText = 'Add to BookSubscription';
    }
  }

  toggleValue() {
    this.toggle = !this.toggle;
    this.setButtonText();

    this.bookSubscriptionService.toggleBookSubscriptionItem(this.userId, this.bookId).subscribe(
      () => {
        if (this.toggle) {
          this.snackBarService.showSnackBar('Item added to your BookSubscription');
        } else {
          this.snackBarService.showSnackBar('Item removed from your BookSubscription');
        }
      }, error => {
        console.log('Error ocurred while adding to wishlist : ', error);
      });
  }
}
