import { IotaService } from './../iota.service';
import { Component, OnInit } from '@angular/core';
import { BoothService } from '../booth.service';
import { Booth } from '../booth';
var QRCode = require('qrcode');

@Component({
  selector: 'app-booth-manager',
  templateUrl: './booth-manager.component.html',
  styleUrls: ['./booth-manager.component.css']
})
export class BoothManagerComponent implements OnInit {

  constructor(private iotaService: IotaService, private boothService: BoothService) { }

  ngOnInit(): void { }

  name: string;

  generateNewBooth() {

    var canvas = document.getElementById('canvas');

    const seed = this.iotaService.generateSeed();
    this.iotaService.generateAddress(seed)
      .then(address => {
        QRCode.toCanvas(canvas, address, function (error) {
          if (error) console.error(error);
          console.log("Generated QR Code");
        })
      })
      .catch(err => console.error(err));

      var booth = new Booth(seed,this.name);

      this.boothService.addBooth(booth);
  }

  generateQRFromAddress(address: string) {
    return null;
  }

}
