import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return lastValueFrom(this.http.get<string[]>('/api/countries'))
  }

  getAccomodationList(
      country: string, 
      numberOfPerson: number, 
      priceMin: number, 
      priceMax: number) 
  {
    const params = new HttpParams()
        .set('country', country)
        .set('numberOfPerson', numberOfPerson)
        .set('priceMin', priceMin)
        .set('priceMax', priceMax)

    return lastValueFrom(this.http.get<any[]>('/api/search', { params }))
  }

  getAccomodationById(id: string) {
    return lastValueFrom(this.http.get<any>(`/api/details/${id}`))
  }

  createBooking(bookingForm: FormGroup) {
    const payload = {
      id: bookingForm.value.id,
      name: bookingForm.value.name,
      email: bookingForm.value.email,
      arrival: bookingForm.value.arrival,
      duration: bookingForm.value.duration
    }
    console.log(payload)
    return lastValueFrom(this.http.post<any>('/api/booking', payload))
  }
}
