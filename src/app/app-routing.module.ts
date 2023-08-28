import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchAccComponent } from './components/search-acc/search-acc.component';
import { ListingsComponent } from './components/listings/listings.component';
import { DetailsComponent } from './components/details/details.component';
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation.component';

const routes: Routes = [
  { path: '', component: SearchAccComponent },
  { 
    path: 'search/:country/:numberOfPerson/:priceMin/:priceMax', 
    component: ListingsComponent 
  },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'confirmation/:bookingRef', component: BookingConfirmationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
