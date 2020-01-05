import * as Yup from 'yup';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class HelpOrdersStudentController {
  async index(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'O estudante não existe!' });
    }

    const { page = 1 } = req.query;
    const limit = 6;

    const help_orders = await HelpOrder.findAll({
      where: {
        student_id,
      },
      order: [['id', 'DESC']],
      limit,
      offset: (page - 1) * limit,
    });

    return res.json({ help_orders });
  }

  async store(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'O estudante não existe!' });
    }

    const schema = Yup.object({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos Inválidos' });
    }

    const question = await HelpOrder.create({
      student_id,
      question: req.body.question,
    });

    return res.json(question);
  }
}
export default new HelpOrdersStudentController();
