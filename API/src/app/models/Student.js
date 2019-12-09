import { Model, Sequelize } from 'sequelize';
import { getYear } from 'date-fns';
// import pt from 'date-fns/locale/pt';

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
        // date_birth: Sequelize.DATE,
        date_birth: Sequelize.DATE,
        active: Sequelize.BOOLEAN,
        age: {
          type: Sequelize.VIRTUAL(Sequelize.DATE, ['date_birth']),
          get() {
            return getYear(new Date()) - getYear(this.get('date_birth'));
            // return subYears(new Date(), this.get('date_birth'));
          },
        },
        // date_birth_formted: {
        //   type: Sequelize.VIRTUAL(Sequelize.DATE, ['date_birth']),
        //   get() {
        //     return format(new Date(this.get('date_birth')), 'dd-MM-yyyy', {
        //       locale: pt,
        //     });
        //     // return this.get('date_birth');
        //   },
        // },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Student;
