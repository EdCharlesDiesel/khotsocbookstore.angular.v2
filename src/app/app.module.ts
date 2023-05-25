import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {NgMaterialModule} from "./ng-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./components/home/home.component";
import {BookCardComponent} from "./components/book-card/book-card.component";
import {BookDetailsComponent} from "./components/book-details/book-details.component";
import {ThemePickerComponent} from "./components/theme-picker/theme-picker.component";
import {AddtowishlistComponent} from "./components/addtowishlist/addtowishlist.component";
import {BookFilterComponent} from "./components/book-filter/book-filter.component";
import {UserRegistrationComponent} from "./components/user-registration/user-registration.component";
import {LoginComponent} from "./components/user/login.component";
import {PriceFilterComponent} from "./components/price-filter/price-filter.component";
import {BookSubscriptionComponent} from "./components/book-subscription/book-subscription.component";
import {SimilarbooksComponent} from "./components/similarbooks/similarbooks.component";
import {AddtocartComponent} from "./components/addtocart/addtocart.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {MyOrdersComponent} from "./components/my-orders/my-orders.component";
import {AddtobooksubscriptionComponent} from "./components/addtobooksubscription/addtobooksubscription.component";
import {SearchComponent} from "./components/search/search.component";
import {WishlistComponent} from "./components/wishlist/wishlist.component";
import {ShoppingcartComponent} from "./components/shoppingcart/shoppingcart.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    AddtocartComponent,
    BookCardComponent,
    BookDetailsComponent,
    BookFilterComponent,
    CheckoutComponent,
    LoginComponent,
    MyOrdersComponent,
    UserRegistrationComponent,
    HomeComponent,
    NavBarComponent,
    ShoppingcartComponent,
    ThemePickerComponent,
    SimilarbooksComponent,
    PageNotFoundComponent,
    PriceFilterComponent,
    SearchComponent,
    AddtowishlistComponent,
    WishlistComponent,
    BookSubscriptionComponent,
    AddtobooksubscriptionComponent
  ],
  imports: [
    NgMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
