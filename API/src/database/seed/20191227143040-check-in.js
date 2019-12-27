// yarn sequelize seed:generate --name plans
// yarn sequelize db:seed:all

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'checkins',
      [
        {
          student_id: 1,
          created_at: new Date('07-10-2019'),
          updated_at: new Date(),
        },
        {
          student_id: 1,
          created_at: new Date('08-10-2019'),
          updated_at: new Date(),
        },
        {
          student_id: 2,
          created_at: new Date('08-10-2019'),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
