const express = require('express');
const rotues = require('./routes');

// yarn init -y
// yarn add express

class App {
 constructor() {
   this.server = express();
   this.middlewares();
   this.routes();
 }

 middlewares(){
  this.server.use(express.json());
 }

 routes(){
  this.server.use(rotues)
 }

 
}

module.exports = new App().server;

