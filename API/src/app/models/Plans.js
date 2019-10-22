import { Model, Sequelize } from 'sequelize';

class Plans extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER(2),
        price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
  }
}

export default Plans;
