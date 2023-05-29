import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { BookFormComponent } from './book-form/book-form.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import {NgMaterialModule} from "../ng-material.module";

@NgModule({
  declarations: [
    BookFormComponent,
    ManageBooksComponent,
    DeleteBookComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgMaterialModule
  ],
})
export class AdminModule { }
