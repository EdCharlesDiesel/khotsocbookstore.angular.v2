import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import {EMPTY, Observable, pipe} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  id :any;
  BookDetails$: Observable<Book>= new Observable<Book>();
  userData$: Observable<User>= new Observable<User>()

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService) {
    this.id = this.route.snapshot.paramMap.get('id');
    //this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
    //this.id = JSON.parse(this.route.snapshot.paramMap.get('id') || '{}')
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
       this.id = params['id'];
        this.getBookDetails(this.id);
      }
    );
    this.userData$ = this.subscriptionService.userData;
  }

 public async  getBookDetails( id: string) {
    debugger
    //TODO need to fix this
  await this.bookService.getBookById(id)
   .pipe(tap((x)=>console.log('This is the value of book',x)),
    catchError(error => {
       console.log('Error ocurred while fetching book data : ', error);
       return EMPTY;
     })).subscribe( {
      next(x){
        console.log('This is the value of book',x)

      }
    });
  }
}
