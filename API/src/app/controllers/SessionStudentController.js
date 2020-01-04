import * as Yup from 'yup';
// import { isBefore, isAfter } from 'date-fns';
import DateActive from '../services/DateActive';
import Student from '../models/Student';
import Registration from '../models/Registration';
import Plan from '../models/Plan';

class SessionStudentController {
  async store(req, res) {
    const schema = Yup.object({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos Inválidos' });
    }

    const { id } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(401).json({ error: 'O estudante não existe!' });
    }

    const registration = await Registration.findOne({
      attributes: ['id', 'start_date', 'end_date'],
      where: { student_id: student.id },
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price', 'total_price'],
        },
      ],
    });
    // const registration = Registration.find({
    //   where: { id: 1 },
    // });

    if (!registration) {
      return res.status(401).json({
        error: 'Você ainda não possui matrícula, fale com um instrutor.',
      });
    }

    await DateActive.run({
      start_date: registration.start_date,
      end_date: registration.end_date,
    });

    student.registration = registration;
    // return res.json(active);
    return res.json({ student, registration });
  }
}

export default new SessionStudentController();
