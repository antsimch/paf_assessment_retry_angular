import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Listing } from 'src/app/models';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit, OnDestroy {

  country!: string
  numberOfPerson!: number
  priceMin!: number
  priceMax!: number
  listings: Listing[] = []
  routeSub$!: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchSvc: SearchService,
    private router: Router,
    private location: Location) { }

  getDetails(id: string) {
    this.router.navigate(['/details', id])
  }

  getBack() {
    this.location.back()
  }

  ngOnInit(): void {
    this.routeSub$ = this.activatedRoute.params.subscribe(
      route => {
        this.country = route['country']
        this.numberOfPerson = route['numberOfPerson']
        this.priceMin = route['priceMin']
        this.priceMax = route['priceMax']

        console.log(this.country)
        console.log(this.numberOfPerson)
        console.log(this.priceMin)
        console.log(this.priceMax)

        this.searchSvc.getAccomodationList(
          this.country,
          this.numberOfPerson,
          this.priceMin,
          this.priceMax)
          .then(
            result => {
              this.listings = result.map(
                value => {
                  return {
                    id: value.id,
                    addressStreet: value.addressStreet,
                    price: value.price,
                    image: value.image} as Listing})
                  console.log(this.listings)})
          .catch(
            error => {
              this.router.navigate(['/'])
            })})
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe()
  }
}
