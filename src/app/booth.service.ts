import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booth } from './booth';

@Injectable({
  providedIn: 'root'
})
export class BoothService {

  booths: Booth[] = [];

  constructor() { 
    var savedBooths = localStorage.getItem('booths');
    if(savedBooths != null){
      this.booths = JSON.parse(localStorage.getItem('booths'));
    }
  }

  getBooths(): Observable<Booth[]>{
    return of(this.booths);
  }

  addBooth(booth: Booth){
    this.booths.push(booth);
    localStorage.setItem('booths', JSON.stringify(this.booths));
    console.log(this.booths.toString());
  }
}
