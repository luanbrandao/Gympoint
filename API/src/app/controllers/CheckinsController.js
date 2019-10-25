import * as Yup from 'yup';
import { subDays, startOfDay, endOfDay } from 'date-fns';

import { Op } from 'sequelize';
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

    const date = new Date();
    const endDate = subDays(date, 7);

    const checkins = await Checkin.findAll({
      where: {
        student_id,
        createdAt: {
          [Op.between]: [endDate, date],
          // [Op.between]: [date, endDate],
        },
      },
    });

    if (checkins.length > 4) {
      return res
        .status(401)
        .json({ error: 'Have you done 7 checkins this week!' });
    }

    const checkin = await Checkin.create({ student_id });
    return res.json(checkin);
  }
}

export default new CheckinsController();
