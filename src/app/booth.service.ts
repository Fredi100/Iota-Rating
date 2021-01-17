import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booth } from './booth';
import { IotaService } from './iota.service';

@Injectable({
  providedIn: 'root'
})
export class BoothService {

  booths: Booth[] = [];

  constructor(private iotaService: IotaService) { 
    var savedBooths = localStorage.getItem('booths');
    if(savedBooths != null){
      this.booths = JSON.parse(localStorage.getItem('booths'));
      this.refreshRating();
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

  refreshRating(): void {
    this.booths.forEach(booth => {
      this.iotaService.checkBalanceForSeed(booth.seed)
        .then(balance => {
          booth.rating = balance;
        })
    })
  } 
}
