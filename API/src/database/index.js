// faz a conexão com o bando de dados e carrega os models
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Plans from '../app/models/Plans';

const models = [User, Student, Plans];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // faz a conexão com a base de dados
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
