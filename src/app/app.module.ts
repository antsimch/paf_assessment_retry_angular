import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchAccComponent } from './components/search-acc/search-acc.component';
import { ListingsComponent } from './components/listings/listings.component';
import { DetailsComponent } from './components/details/details.component';
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchAccComponent,
    ListingsComponent,
    DetailsComponent,
    BookingConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [Location],
  bootstrap: [AppComponent]
})
export class AppModule { }
