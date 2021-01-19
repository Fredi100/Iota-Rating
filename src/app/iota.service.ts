import { Injectable } from '@angular/core';
import { API, composeAPI } from '@iota/core';

const Converter = require('@iota/converter');
const Extract = require('@iota/extract-json')


@Injectable({
  providedIn: 'root'
})
export class IotaService {

  iota: API;

  seed: string;

  depth: number = 20;
  minimumWeightMagnitude: number = 5;

  // TODO: get infos from environment file
  constructor() {
    this.iota = composeAPI({
      provider: 'https://tesserekt.net:14267'
    });

    this.seed = "TIONONYQUNOZLXJEJZA9EFPT9YLTBMKVXGIXFQEFWGNSSMKEMMBTDSVMDBKW9MACKWUYQH9WUENLJGXQN";
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

  /*
  The procedure to calculate an address checksum is as follows:
  Start with an IOTA address (81 trytes).Address (trytes): FSAFM … NVDZC
  Convert the address (81 trytes) to trits (= 81 x 3 = 243 trits)
  Address (trits): 1,0,-1,1,0,-1 … -1,0,0,0,1,0
  The address is hashed using the Keccak-384 hash algorithm.

  Convert the address checksum (243 trits) to trytes (81 trytes): …PJFNYWVUGKPRTRV
  Get the last 9 trytes: VUGKPRTRV
  Append the last 9 trytes to the original address: FSAFM … NVDZCVUGKPRTRV
  The address including checksum has a length of 81 + 9 = 90 trytes.
  */
  generateAddress(seed: string): Promise<string> {
    return this.iota.getNewAddress(seed, {index: 0, security: 2, checksum: true});
  }

  raiseStartingBalance(address: string, value: number): void {

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
      .prepareTransfers(this.seed, transfers)
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
      });
  }

  async checkBalanceForSeed(seed: string): Promise<number>{
    var accountData = await this.iota.getAccountData(seed);
    return accountData.balance;
  }

}
