import express from 'express';
import rotues from './routes';

// yarn init -y
// yarn add express
// para usar import
// yarn add sucrase nodemon -D
// yarn add eslint -D
// yarn eslint --init
// deixa o codigo bonito kk
// yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
// todos os arquivos dentro da pasta src sao ajustados com o eslint automaticamente
// yarn eslint --fix src --ext .js

// yarn add sequelize
// ajuda na criação de models e migrations
// yarn add sequelize-cli -D
// yarn add pg pg-hstore
class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(rotues);
  }
}

export default new App().server;
