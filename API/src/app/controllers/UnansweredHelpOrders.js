import * as Yup from 'yup';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
// import Mail from '../../lib/Mail';
import Queue from '../../lib/Queue';
import AnswerMail from '../jobs/AnswerMail';

class UnansweredHelpOrders {
  async index(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'O estudante não existe!' });
    }

    const { page = 1 } = req.query;

    const help_orders = await HelpOrder.findAll({
      where: {
        student_id,
        answer: null,
      },
      order: [['id', 'DESC']],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(help_orders);
  }

  async store(req, res) {
    const { help_orders_id } = req.params;

    const help_order = await HelpOrder.findByPk(help_orders_id);

    if (!help_order) {
      return res.status(401).json({ error: 'Pedido de ajuda não existe!' });
    }

    const schema = Yup.object({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos Inválidos' });
    }

    const date = new Date();

    const answer = await help_order.update({
      id: help_orders_id,
      answer: req.body.answer,
      answer_at: date,
    });

    const student = await Student.findByPk(help_order.student_id);

    // await Mail.sendMail({
    //   to: `${student.name} <${student.email}>`,
    //   subject: `A academia respondeu sua pergunta!`,
    //   text: `

    //   Resposta:: ${answer.answer}.
    //   Data da responta: ${answer.answer_at}.

    //   `,
    // });
    await Queue.add(AnswerMail.key, {
      answer: {
        student: {
          name: student.name,
          email: student.email,
        },
        message: req.body.answer,
      },
    });

    return res.json(answer);
  }
}
export default new UnansweredHelpOrders();
