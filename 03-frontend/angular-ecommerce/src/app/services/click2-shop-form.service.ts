import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../common/country';
import {map} from 'rxjs/operators'
import { State } from '../common/state';


@Injectable({
  providedIn: 'root'
})
export class Click2ShopFormService {

  private countriesUrl = 'http://localhost:8080/api/countries'; 
  private statesUrl = 'http://localhost:8080/api/states'; 

  constructor(private httpClient: HttpClient) { }

  // returns an observable maps the JSON data from spring data rest to GetResponseCountries interface
  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    )
  }

    // returns an observable maps the JSON data from spring data rest to GetResponseStates interface
    getStates(theCountryCode: string): Observable<State[]>{

      //search url
      const searchStateUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

      return this.httpClient.get<GetResponseStates>(searchStateUrl).pipe(
        map(response => response._embedded.states)
      )
    }

  getCreditCardMonths(startMonth: number): Observable <number[]>{

    let data:number[] = []

    // build an array for "Month" dropdown list
    // - start at current month and loop until

    for(let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth)
    }

    //The "of" operator from rxjs, will wrap an object as an Observable
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data:number[] = [];

    //build an array for "Year" downlist list
    // - start at current year and loop for next 10 years

    const startYear: number = new Date().getFullYear(); // get the current year 
    const endYear : number = startYear + 10;

    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }

    return of(data);
  }
}

// unwraps the JSON from spring Data REST embedded entry
interface GetResponseCountries {
  _embedded: {
    countries:Country[];
  }
}

// unwraps the JSON from spring Data REST embedded entry
interface GetResponseStates {
  _embedded: {
    states:State[];
  }
}
