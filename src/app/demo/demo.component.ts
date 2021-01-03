import { IotaService } from './../iota.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  text: string;

  constructor(private iotaService: IotaService) { }

  ngOnInit(): void {

    this.iotaService.getNodeInfo()
      .then(info => this.text = JSON.stringify(info))
      .catch(error => this.text = error);

  }

}
