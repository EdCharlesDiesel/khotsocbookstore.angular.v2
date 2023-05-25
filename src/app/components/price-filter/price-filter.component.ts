import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { map } from 'rxjs/operators';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss']
})
export class PriceFilterComponent implements OnInit {

  @Output()
  priceValue = new EventEmitter<number>(true);

  max: number =0;
  min: number=0;
  value: number=0;
  step = 100;
  thumbLabel = true;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.setPriceFilterProperties();
  }

  setPriceFilterProperties() {
    this.bookService.books$.pipe().subscribe(
      (data: Book[]) => {
        this.setMinValue(data);
        this.setMaxValue(data);
      }
    );
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  onChange(event: any) {
    this.priceValue.emit(event.value);
  }

  public setMinValue(book: Book[]) {
    this.min = book.reduce((prev, curr) => {
      return prev.purchasePrice < curr.purchasePrice ? prev : curr;
    }).purchasePrice;
  }

  public setMaxValue(book: Book[]) {
    this.value = this.max = book.reduce((prev, curr) => {
      return prev.purchasePrice > curr.purchasePrice ? prev : curr;
    }).purchasePrice;
  }
}
