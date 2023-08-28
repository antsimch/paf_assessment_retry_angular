import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-search-acc',
  templateUrl: './search-acc.component.html',
  styleUrls: ['./search-acc.component.css']
})
export class SearchAccComponent implements OnInit {

  searchForm!: FormGroup
  countryList: string[] = []
  
  constructor(
    private fb: FormBuilder,
    private searchSvc: SearchService,
    private router: Router) {}
  
  ngOnInit(): void {
    this.searchSvc.getCountries()
        .then(
          result => {
            this.countryList = result
            console.log(this.countryList)
            this.createForm()
            console.log(this.searchForm)
          }
        )
  }

  createForm() {
    this.searchForm = this.fb.group({
      country: this.fb.control<string>(this.countryList[0], 
          [ Validators.required ]),

      numberOfPerson: this.fb.control<number>(1, 
          [ Validators.required, Validators.min(1), Validators.max(10) ]),

      priceMin: this.fb.control<number>(1, 
          [ Validators.required, Validators.min(1), Validators.max(10000) ]),

      priceMax: this.fb.control<number>(1, 
          [ Validators.required, Validators.min(1), Validators.max(10000) ])
    })
  }

  searchForAcc(){
    this.router.navigate(['/search', 
        this.searchForm.value['country'],
        this.searchForm.value['numberOfPerson'],
        this.searchForm.value['priceMin'],
        this.searchForm.value['priceMax']
    ])
  }
}
