import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'src/app/components/shoppingcart/shoppingcart';
import { CartService } from 'src/app/components/shoppingcart/cart.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit, OnDestroy {
  public cartItems: ShoppingCart[] = [];
  userId;
  totalPrice: number;
  private unsubscribe$ = new Subject<void>();
  isLoading: boolean;

  constructor(
    // private store: Store<fromShoppingCart.State>,
    private cartService: CartService,
    private snackBarService: SnackbarService,
    private subscriptionService: SubscriptionService) {
    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
    this.cartItems = [];
    this.totalPrice = 0;
    this.isLoading = false;
  }

  ngOnInit() {
    this.cartItems = [];
    this.isLoading = true;
    this.getShoppingCartItems();
  }
  public getShoppingCartItems() {
    this.cartService.getCartItems(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: ShoppingCart[]) => {
          this.cartItems = result;
          this.getTotalPrice();
          this.isLoading = false;
        }, error => {
          console.log('Error ocurred while fetching shopping cart item : ', error);
        });
  }

  public getTotalPrice() {
    this.totalPrice = 0;
    //FIXME cart items needs to be updated
    // this.cartItems.forEach(item => {
    //   this.totalPrice += (item.book.purchasePrice * item.quantity);
    // });
  }

  public deleteCartItem(bookId: number) {
    this.cartService.removeCartItems(this.userId, bookId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.cartItemcount$.next(result);
          this.snackBarService.showSnackBar('Product removed from cart');
          this.getShoppingCartItems();
        }, error => {
          console.log('Error ocurred while deleting cart item : ', error);
        });
  }

  public addToCart(bookId: number) {
    this.cartService.addBookToCart(this.userId, bookId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.cartItemcount$.next(result);
          this.snackBarService.showSnackBar('One item added to cart');
          this.getShoppingCartItems();
        }, error => {
          console.log('Error ocurred while addToCart data : ', error);
        });
  }

  public deleteOneCartItem(bookId: number) {
    this.cartService.deleteOneCartItem(this.userId, bookId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.cartItemcount$.next(result);
          this.snackBarService.showSnackBar('One item removed from cart');
          this.getShoppingCartItems();
        }, error => {
          console.log('Error ocurred while fetching book data : ', error);
        });
  }

  public clearCart() {
    this.cartService.clearCart(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.cartItemcount$.next(result);
          this.snackBarService.showSnackBar('Cart cleared!!!');
          this.getShoppingCartItems();
        }, error => {
          console.log('Error ocurred while deleting cart item : ', error);
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
