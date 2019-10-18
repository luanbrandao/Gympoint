import { Model, Sequelize } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        // os dados que podem ser enviados
        // o model não precisa ter os mesmos campos do db
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        height: Sequelize.DOUBLE,
        weight: Sequelize.DOUBLE,
        date_birth: Sequelize.DATE,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default Student;
