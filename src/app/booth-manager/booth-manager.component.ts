import { DbService } from './../db.service';
import { IotaService } from './../iota.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booth-manager',
  templateUrl: './booth-manager.component.html',
  styleUrls: ['./booth-manager.component.css']
})
export class BoothManagerComponent implements OnInit {

  constructor(private iotaService: IotaService, private dbService: DbService) { }

  ngOnInit(): void {
  }

  name: string;

  generateNewBooth() {

    // generate seed
    // generate address
    // save in db

    const seed = this.iotaService.generateSeed();
    this.iotaService.generateAddress(seed)
      .then(address => {
        let status = "booth name: " + this.name + "seed: " + seed + "\naddress: " + address
        console.log(status);
      })
      .catch(err => console.error(err));

    //this.dbService.saveBooth(name, seed);
  }

  generateQRFromAddress(address: string) {
    return null;
  }

}
