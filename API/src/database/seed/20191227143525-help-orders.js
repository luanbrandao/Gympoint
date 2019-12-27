module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'help_orders',
      [
        {
          student_id: 1,
          question: 'a academia abre hoje?',
          answer: null,
          answer_at: null,
          created_at: new Date('06-10-2019'),
          updated_at: new Date(),
        },
        {
          student_id: 2,
          question: 'quantos ovos tenho que comer por dia?',
          answer: '10 ovos',
          answer_at: new Date('06-10-2019'),
          created_at: new Date('06-10-2019'),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
