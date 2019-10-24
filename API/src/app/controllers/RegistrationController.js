import * as Yup from 'yup';
import { startOfHour, parseISO, isPast, addMonths, format } from 'date-fns';

import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Mail from '../../lib/Mail';

class RegistrationController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const registration = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      order: [['id', 'DESC']],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(registration);
  }

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

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: `Matricula realizada com sucesso!`,
      text: `
      Matrcula realizada com sucesso!
      Data de início informada: ${start_date}.
      Data de término calculada: ${end_date}.
      Plano selecionado: ${plan.title}
      Preço calculado: R$${price}.
      `,
    });

    // return res.json(student);
    return res.json({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async delete(req, res) {
    const { registrationId } = req.params;
    const registration = await Registration.findByPk(registrationId);

    if (!registration) {
      return res.status(401).json({ error: 'Registration not exist!' });
    }
    await registration.destroy({
      where: { id: req.params.planId },
    });

    return res.status(200).json(registration);
  }
}

export default new RegistrationController();
