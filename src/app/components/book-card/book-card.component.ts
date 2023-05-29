import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Book} from 'src/app/models/book';
import {User} from 'src/app/models/user';
import {SubscriptionService} from 'src/app/services/subscription.service';
import {BookService} from "../../services/book.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input()
  book?: Book;
  id?: any;
  isActive = false;
  userData$: Observable<User> = new Observable<User>();
  BookDetails$: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private bookService: BookService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.userData$ = this.subscriptionService.userData;
    this.BookDetails$ = this.bookService.books$.pipe(map(book => book.find(b => b.id === this.id)));
  }

  goToPage(id: number) {
    this.router.navigate(['/books/details/', id]);
  }
}
