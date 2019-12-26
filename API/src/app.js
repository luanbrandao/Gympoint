import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import 'express-async-errors';

import sentryConfig from './config/sentry';
import rotues from './routes';
import './database';

// yarn init -y
// yarn add express
// para usar import
// yarn add sucrase nodemon -D
// yarn add eslint -D
// yarn eslint --init
// deixa o codigo bonito kk
// yarn add date-fns-tz
// yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
// todos os arquivos dentro da pasta src sao ajustados com o eslint automaticamente
// yarn eslint --fix src --ext .js

// yarn add sequelize
// ajuda na criação de models e migrations
// yarn add sequelize-cli -D
// yarn add pg pg-hstore
// yarn add bcryptjs
// yarn add jsonwebtoken
// validação de form
// yarn add yup

// enviode email
// yarn add nodemailer
// templat do email
// yarn  add express-handlebars nodemailer-express-handlebars
// yarn add bee-queue
// yarn add cors

// trabalha com o tipo multipart/form-data
// yarn add multer

// docker run --name redisbarber -p 6379:6379 -d -t redis:alpine
// yarn add bee-queue

// Tratamento de exceções
// yarn add @sentry/node@5.7.1
// yarn add express-async-errors
// faz uma tratativa das msg de erros
// yarn add youch

// yarn add dotenv

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exeptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(rotues);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exeptionHandler() {
    this.server.use(async (err, req, res, next) => {
      // só se tiver em ambiente de desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
