import * as Yup from 'yup';
// import { isBefore, isAfter } from 'date-fns';
import DateActive from '../services/DateActive';
import Student from '../models/Student';
import Registration from '../models/Registration';

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
      where: { student_id: student.id },
    });
    // const registration = Registration.find({
    //   where: { id: 1 },
    // });
    const active = await DateActive.run({
      start_date: registration.start_date,
      end_date: registration.end_date,
    });

    return res.json(active);
    // return res.json({ student });
  }
}

export default new SessionStudentController();
