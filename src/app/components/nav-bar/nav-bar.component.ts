import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {UserType} from "../../models/usertype";
import {SubscriptionService} from "../../services/subscription.service";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  userId;
  userDataSubscription: any;
  userData: any;
  userType = UserType;
  wishListCount$: Observable<number> | undefined;
  cartItemCount$: Observable<number>| undefined;
  bookSubscriptionCount$ : Observable<number>| undefined;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    //FIXME book subscription
    //private bookSubscriptionService: BookSubscriptionService,
    private subscriptionService: SubscriptionService,
    //FIXME wishlist subscription
    //private wishlistService: WishlistService
  ) {
    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
    // this.wishlistService.getWishlistItems(this.userId).subscribe();
    // this.bookSubscriptionService.getBookSubscriptionItems(this.userId).subscribe();
    this.userService.getCartItemCount(this.userId).subscribe((data: number) => {
      this.subscriptionService.cartItemcount$.next(data);
    });
  }

  ngOnInit() {

    this.userDataSubscription = this.subscriptionService.userData.asObservable().subscribe(data => {this.userData = data; });
    this.bookSubscriptionCount$ = this.subscriptionService.bookSubItemcount$;
    this.cartItemCount$ = this.subscriptionService.cartItemcount$;
    this.wishListCount$ = this.subscriptionService.wishlistItemcount$;
  }


  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
