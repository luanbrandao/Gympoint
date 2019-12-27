// yarn sequelize seed:generate --name plans
// yarn sequelize db:seed:all

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Bruno',
          email: 'bruno@gmail.com',
          phone: '91991919191',
          height: 1.72,
          weight: 57.9,
          date_birth: new Date('12-12-1994'),
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Ana',
          email: 'ana@gmail.com',
          phone: '91991919191',
          height: 1.52,
          weight: 51,
          date_birth: new Date('10-09-1996'),
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
