// import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

class HelpOrderstController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const help_orders = await HelpOrder.findAll({
      where: {
        answer: null,
      },
      order: [['id', 'DESC']],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json({ help_orders });
  }

  // async store(req, res) {
  //   const { student_id } = req.params;

  //   const student = await Student.findByPk(student_id);

  //   if (!student) {
  //     return res.status(401).json({ error: 'Student not exist!' });
  //   }

  //   const schema = Yup.object({
  //     question: Yup.string().required(),
  //   });

  //   if (!(await schema.isValid(req.body))) {
  //     return res.status(400).json({ error: 'Validation fails' });
  //   }

  //   const question = await HelpOrder.create({
  //     student_id,
  //     question: req.body.question,
  //   });

  //   return res.json(question);
  // }
}
export default new HelpOrderstController();
