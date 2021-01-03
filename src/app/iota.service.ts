import { Injectable } from '@angular/core';
import { API, composeAPI } from '@iota/core';

@Injectable({
  providedIn: 'root'
})
export class IotaService {

  iota: API;

  constructor() {
    this.iota = composeAPI({
      provider: 'http://tesserekt.net:14267'
    });
   }

  ngOnInit(): void {
  }

  async getNodeInfo(): Promise<JSON> {

    return await this.iota.getNodeInfo();

  }


}
