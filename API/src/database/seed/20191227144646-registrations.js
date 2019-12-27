module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'registrations',
      [
        {
          student_id: 1,
          plan_id: 1,
          start_date: new Date('05-10-2019'),
          end_date: new Date('06-10-2019'),
          price: 129,
          created_at: new Date('05-10-2019'),
          updated_at: new Date(),
        },
        {
          student_id: 2,
          plan_id: 2,
          start_date: new Date('05-10-2019'),
          end_date: new Date('08-10-2019'),
          price: 109,
          created_at: new Date('05-10-2019'),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
