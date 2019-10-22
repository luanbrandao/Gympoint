// faz a conexão com o bando de dados e carrega os models
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';

const models = [User, Student, Plan, Registration];

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
