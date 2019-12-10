import { Model, Sequelize } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.DOUBLE,
        total_price: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, ['duration', 'price']),
          get() {
            return (this.get('duration') * this.get('price')).toFixed(2);
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Plan;
