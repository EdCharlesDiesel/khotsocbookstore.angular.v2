import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSubscriptionComponent } from './book-subscription.component';

describe('BookSubscriptionComponent', () => {
  let component: BookSubscriptionComponent;
  let fixture: ComponentFixture<BookSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
