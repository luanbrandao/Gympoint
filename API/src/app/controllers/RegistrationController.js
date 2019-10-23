import * as Yup from 'yup';
import { startOfHour, parseISO, isPast, addMonths, format } from 'date-fns';

import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Student not exist!' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(401).json({ error: 'Plan not exist!' });
    }

    // verifica se é uma data que ainda não passou
    const hourStart = startOfHour(parseISO(start_date));
    if (isPast(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past date are not permitted' });
    }

    const price = plan.price * plan.duration;

    const date = format(parseISO(start_date), 'yyyy/MM/dd').split('/');
    const end_date = addMonths(new Date(date), plan.duration);

    await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }
}

export default new RegistrationController();
