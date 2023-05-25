import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { Book } from '../models/book';
import { Categories } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseURL = 'https://localhost:5000/api/book/';

  constructor(private http: HttpClient) { }

  categories$ = this.http.get<Categories[]>(this.baseURL + 'GetCategoriesList').pipe(shareReplay(1));

  books$ = this.getAllBooks().pipe(shareReplay(1));

  getAllBooks() {
    return this.http.get<Book[]>(this.baseURL);
  }

  addBook(book:Book) {
    return this.http.post(this.baseURL, book);
  }


  getsimilarBooks(bookId: number) {
    return this.http.get<Book[]>(this.baseURL + 'GetSimilarBooks/' + bookId);
  }


  getBookById(id: number) {
    return this.books$.pipe(map(book => book.find(b => b.bookId === id)));
  } 

  updateBookDetails(book:Book) {
    return this.http.put(this.baseURL, book);
  }

  deleteBook(id: number) {
    return this.http.delete(this.baseURL + id);
  }
}
