import * as Yup from 'yup';
import { startOfHour, parseISO, isPast, addMonths, format } from 'date-fns';
import { Op } from 'sequelize';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';
// import Mail from '../../lib/Mail';
import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';

class RegistrationController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const registrations = await Registration.findAll({
      where: {
        student_id: {
          [Op.ne]: null,
        },
        plan_id: {
          [Op.ne]: null,
        },
      },
      attributes: [
        'id',
        'start_date',
        'end_date',
        'plan_id',
        'price',
        'active',
      ],
      order: [['id', 'DESC']],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });

    return res.json({ registrations });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos Inválidos' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'O estudante não existe!' });
    }

    const existRegistration = await Registration.findOne({
      where: { student_id },
    });

    if (existRegistration) {
      return res.status(401).json({
        error: 'O estudante já tem uma matrícula, você pode atualizá-la',
      });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(401).json({ error: 'O plano não existe!' });
    }

    // // se nã o fizer isso a data perde a confi 'T03'
    //     // o que faz com que ela fique com 1 dia a menos
    const newStartDate = parseISO(start_date);

    // verifica se é uma data que ainda não passou
    const hourStart = startOfHour(parseISO(start_date));
    if (isPast(hourStart, new Date())) {
      // return res.status(400).json({ error: 'Past date are not permitted' });
      return res
        .status(400)
        .json({ error: 'Datas passadas não são permitidas!' });
    }

    const price = plan.price * plan.duration;

    const date = format(parseISO(start_date), 'yyyy/MM/dd').split('/');
    const end_date = addMonths(new Date(date), plan.duration);

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date: newStartDate,
      end_date,
      price,
    });

    // await Mail.sendMail({
    //   to: `${student.name} <${student.email}>`,
    //   subject: `Nova Matricula`,
    //   template: 'resistration',
    //   context: {
    //     student: student.name,
    //     start: start_date,
    //     end: end_date,
    //     plan: plan.title,
    //     price,
    //   },
    // });

    await Queue.add(RegistrationMail.key, {
      register: {
        student: {
          name: student.name,
          email: student.email,
        },
        start: start_date,
        end: end_date,
        plan: {
          title: plan.title,
          price,
        },
        cod: registration.id,
      },
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

  async update(req, res) {
    const { registrationId } = req.params;
    const registration = await Registration.findByPk(registrationId);

    if (!registration) {
      return res.status(401).json({ error: 'Matrícula nõ existe!' });
    }

    // const student = await Student.findByPk(registration.student_id);

    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos Inválidos' });
    }

    const { plan_id, start_date, student_id } = req.body;

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(401).json({ error: 'Plan not exist!' });
    }

    const price = plan.price * plan.duration;

    const hourStart = startOfHour(parseISO(start_date));

    if (isPast(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'Datas passadas não são permitidas!' });
    }
    const date = format(parseISO(start_date), 'yyyy/MM/dd').split('/');
    const end_date = addMonths(new Date(date), plan.duration);

    await registration.update({
      student_id,
      plan_id,
      price,
      start_date,
      end_date,
    });

    // await Mail.sendMail({
    //   to: `${student.name} <${student.email}>`,
    //   subject: `Matricula atualizada!`,
    //   template: 'resistration',
    //   content: {},
    // });

    return res.json({ plan_id, start_date, end_date, price });
  }

  async delete(req, res) {
    const { registrationId } = req.params;
    const registration = await Registration.findByPk(registrationId);

    if (!registration) {
      return res.status(401).json({ error: 'A matrícula não existe!' });
    }
    await registration.destroy({
      where: { id: req.params.planId },
    });

    return res.status(200).json(registration);
  }
}

export default new RegistrationController();
