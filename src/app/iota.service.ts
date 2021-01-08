import { Injectable } from '@angular/core';
import { API, composeAPI } from '@iota/core';

const Converter = require('@iota/converter');
const Extract = require('@iota/extract-json')


@Injectable({
  providedIn: 'root'
})
export class IotaService {

  iota: API;

  depth: number = 20;
  minimumWeightMagnitude: number = 5;

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

  generateSeed(): string {
    var length       = 81;
    var chars        = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
    var randomValues = new Uint32Array(length);
    var result       = new Array(length);

    window.crypto.getRandomValues(randomValues);

    var cursor = 0;
    for (var i = 0; i < randomValues.length; i++) {
        cursor += randomValues[i];
        result[i] = chars[cursor % chars.length];
    }

    return result.join('');
  }

  generateAddress(seed: string): Promise<string> {
    return this.iota.getNewAddress(seed, {index: 0, security: 2});
  }

  raiseStartingBalance(address: string, seed: string, value: number): boolean {

    const message = "starting balance";

    const messageInTrytes = Converter.asciiToTrytes(message);

    const transfers = [
      {
        value: value,
        address: address,
        message: messageInTrytes
      }
    ];

    this.iota
      .prepareTransfers(seed, transfers)
      .then(trytes => this.iota.sendTrytes(trytes, this.depth, this.minimumWeightMagnitude))
      .then(bundle => {
        const tailTransactionHash = bundle[0].hash;
        console.log(tailTransactionHash);

        return this.iota.getBundle(tailTransactionHash)
          .then(bundle => {
            console.log(JSON.parse(Extract.extractJson(bundle)));
          })
      })
      .catch(err => {
        console.error(err);
        return false;
      });

      return true;
  }

}
