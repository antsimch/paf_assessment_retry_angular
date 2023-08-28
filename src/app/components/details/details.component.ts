import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchService } from 'src/app/search.service';
import { Details } from 'src/app/models';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  bookingForm!: FormGroup

  details: Details = {
    id: '',
    description: '',
    address: [],
    price: 0,
    amenities: '',
    image: ''
  }

  error!: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchSvc: SearchService,
    private location: Location,
    private fb: FormBuilder,
    private router: Router) {}

  createBooking() {
    this.searchSvc.createBooking(this.bookingForm)
      .then(
        result => {
          this.router.navigate(['/confirmation', result.bookingRef])})
      .catch(
        error => {
          this.error = error.error
          console.log(this.error)
        }
      )
  }

  goBack() {
    this.location.back()
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']
    this.searchSvc.getAccomodationById(id)
      .then(
        results => {
          console.log(results)
          this.details.id = results['id']
          this.details.description = results['description']
          this.details.address = results['address']
          this.details.price = results['price']
          this.details.amenities = 
              results['amenities'].toString().replaceAll(',', ', ')
          this.details.image = results['image']
          console.log(this.details)
          this.createForm(this.details.id)})
      .catch(
        error => {
          this.location.back()
        }
      )
  }

  createForm(id: string) {
    this.bookingForm = this.fb.group(
      {
        id: this.fb.control<string>(id),
        name: this.fb.control<string>('', [ Validators.required ]),
        email: this.fb.control<string>('', [ Validators.required, 
              Validators.email ]),
        arrival: this.fb.control<Date>(new Date, [ this.validateDate ]),
        duration: this.fb.control<number>(1, [ Validators.required, 
              Validators.min(1) ])
      }
    )
  }

  validateDate(control: AbstractControl) {
    const arrivalDate = Date.parse(control.value)

    if(arrivalDate >= new Date().setHours(0,0,0,0))
      return null

    return { 'lessThanToday': true } as ValidationErrors
  }
}
