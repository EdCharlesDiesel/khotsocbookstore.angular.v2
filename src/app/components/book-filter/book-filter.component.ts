import { Component, OnInit, Input } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { Categories } from 'src/app/models/categories';
// import { Store } from '@ngrx/store';
// import * as frombookFilter from './state/book-filter.selectors';
// import * as bookSubscriptionActions from './state/book-filter.actions';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss']
})
export class BookFilterComponent implements OnInit {

  @Input()
  category: string;

  categories$: Observable<Categories[]>;

  constructor(private bookService: BookService,   
    //private store: Store<frombookFilter.State>,
    ) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): any {
    this.categories$ = this.bookService.categories$
      .pipe(
        catchError(error => {
          console.log('Error ocurred while fetching category List : ', error);
          return EMPTY;
        }));
  }
}
