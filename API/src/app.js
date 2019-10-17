import  express from 'express';
import  rotues from './routes';

// yarn init -y
// yarn add express
// para usar import
// yarn add sucrase nodemon -D
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

export default  new App().server;

