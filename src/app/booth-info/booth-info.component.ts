import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Booth } from '../booth';
import { BoothService } from '../booth.service';
import { IotaService } from '../iota.service';
import QRCode from 'qrcode';

@Component({
  selector: 'app-booth-info',
  templateUrl: './booth-info.component.html',
  styleUrls: ['./booth-info.component.css']
})
export class BoothInfoComponent implements OnInit {

  booths: Booth[];
  addresses: string[];

  @ViewChildren('elements')
  canvases: QueryList<ElementRef>;

  constructor(private boothService: BoothService,
              private iotaService: IotaService) {
    this.booths = [];
    this.addresses = [];
  }

  ngOnInit(): void {
    this.getBooths();
  }

  getBooths(): void {
    this.boothService.getBooths().subscribe(booths => {
      this.booths = booths;
    });
  }

  ngAfterViewInit(): void {
    this.canvases.forEach(container => {
      var bootId = container.nativeElement.id;
      this.iotaService.generateAddress(this.booths[bootId].seed)
        .then(address => {
          console.log("Address: " + address);
          var canvas = document.createElement("canvas");
          QRCode.toCanvas(canvas, address);
          container.nativeElement.appendChild(canvas);
        });
    });
  }
}
