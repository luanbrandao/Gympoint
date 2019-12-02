import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

class StudentController {
  async index(req, res) {
    const { name } = req.params;
    // const { name } = req.body;
    let students;

    if (name) {
      students = await Student.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
      });
    } else {
      students = await Student.findAll();
    }

    return res.json({ students });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      // valida o numero de telefone
      phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const {
      name,
      email,
      phone,
      height,
      weight,
      date_birth,
      active,
    } = await Student.create(req.body);
    return res.json({ name, email, phone, height, weight, date_birth, active });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .required()
        .positive()
        .integer(),
      email: Yup.string().email(),
      // valida o numero de telefone
      phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails id' });
    }

    const { id, email } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(401).json({ error: 'Student not exist' });
    }

    if (email !== student.email) {
      const studentExists = await Student.findOne({
        where: { email: req.body.email },
      });
      if (studentExists) {
        return res.status(400).json({ error: 'Email already exists.' });
      }
    }

    const {
      name,
      phone,
      height,
      weight,
      date_birth,
      active,
    } = await student.update(req.body);
    return res.json({ name, email, phone, height, weight, date_birth, active });
  }
}

export default new StudentController();
