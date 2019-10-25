import * as Yup from 'yup';

import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinsController {
  async store(req, res) {
    const schema = Yup.object({
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Student not exist!' });
    }

    const checkin = await Checkin.create({ student_id });
    return res.json(checkin);
  }
}

export default new CheckinsController();
