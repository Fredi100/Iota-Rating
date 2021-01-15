import { Injectable } from '@angular/core';
const mongoose = require('mongoose');


@Injectable({
  providedIn: 'root'
})
export class DbService {

  url;
  db;

  constructor() {
    this.url = "mongodb://localhost:27017/mydb";
    this.initConnection();
  }

  initConnection(): void {
    mongoose.connect(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("loggen ist geil oder so idk bin kein holzfäller");

    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.db.once('open', console.log('connection to db established'));
  }
}