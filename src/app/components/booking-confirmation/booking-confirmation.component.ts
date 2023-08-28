import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css']
})
export class BookingConfirmationComponent implements OnInit {

  bookingRef!: string

  constructor(
      private activatedRoute: ActivatedRoute, 
      private location: Location) {}

  goBack() {
    this.location.back()
  }

  ngOnInit(): void {
    this.bookingRef = this.activatedRoute.snapshot.params['bookingRef']
  }
}
