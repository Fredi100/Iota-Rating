import { Component, OnInit } from '@angular/core';
import { IotaService } from '../iota.service';

@Component({
  selector: 'app-visitor-setup',
  templateUrl: './visitor-setup.component.html',
  styleUrls: ['./visitor-setup.component.css']
})
export class VisitorSetupComponent implements OnInit {

  address: string;
  // iota per visitor
  value: number;

  transactionHash: string;

  constructor(private iotaService: IotaService) {
    // how many iota a visitor is allowed to spend on ratings
    this.value = 1000;
  }

  ngOnInit(): void {
  }

  raiseStartingBalance(): void {
    this.iotaService.raiseStartingBalance(this.address, this.value)
      .then(hash => this.transactionHash = hash)
      .catch(error => console.error(error));
  }

}
