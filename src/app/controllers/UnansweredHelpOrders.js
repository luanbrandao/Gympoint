import * as Yup from 'yup';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class UnansweredHelpOrders {
  async index(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Student not exist!' });
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
}
export default new UnansweredHelpOrders();
