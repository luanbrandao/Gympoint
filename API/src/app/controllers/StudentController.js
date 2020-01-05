import * as Yup from 'yup';
import { Op } from 'sequelize';
// import { format } from 'date-fns';
// import pt from 'date-fns/locale/pt';
import Student from '../models/Student';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

class StudentController {
  async index(req, res) {
    const { name } = req.params;
    const { page = 1 } = req.query;
    const limit = 6;
    let students;

    if (name) {
      students = await Student.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        order: ['name'],
        limit,
        offset: (page - 1) * limit,
      });
    } else {
      students = await Student.findAll({
        limit,
        offset: (page - 1) * limit,
      });
    }

    return res.json({ students });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      // valida o numero de telefone
      phone: Yup.string().matches(
        phoneRegExp,
        'O formato do telefone está incorreto!'
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos Inválidos' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Esse estudante já existe.' });
    }

    const data = req.body;

    // o web manda no formato 12/12/1212, converte para 12-12-1212
    data.date_birth = data.date_birth
      ? data.date_birth.replace(new RegExp('/', 'g'), '-')
      : null;
    // como o web manda tudo como string,
    // quando mandava a string vazia data erro
    data.height = data.height ? parseFloat(data.height) : null;
    data.weight = data.weight ? parseFloat(data.weight) : null;

    const {
      name,
      email,
      phone,
      height,
      weight,
      date_birth,
      active,
    } = await Student.create(data);
    return res.json({ name, email, phone, height, weight, date_birth, active });
    // return res.json(data);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .required()
        .positive()
        .integer(),
      email: Yup.string().email(),
      // valida o numero de telefone
      phone: Yup.string().matches(
        phoneRegExp,
        'O formato do telefone está incorreto!'
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos Inválidos' });
    }

    const { id, email } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(401).json({ error: 'Estudante não existe!' });
    }

    if (email !== student.email) {
      const studentExists = await Student.findOne({
        where: { email: req.body.email },
      });
      if (studentExists) {
        return res.status(400).json({ error: 'Esse email já está em uso.' });
      }
    }

    const data = req.body;

    // o web manda no formato 12/12/1212, converte para 12-12-1212
    data.date_birth = data.date_birth
      ? data.date_birth.replace(new RegExp('/', 'g'), '-')
      : null;
    // como o web manda tudo como string,
    // quando mandava a string vazia data erro
    data.height = data.height ? parseFloat(data.height) : null;
    data.weight = data.weight ? parseFloat(data.weight) : null;

    const {
      name,
      phone,
      height,
      weight,
      date_birth,
      active,
    } = await student.update(data);

    return res.json({ name, email, phone, height, weight, date_birth, active });
  }

  async delete(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(401).json({ error: 'Estudante não existe!' });
    }

    await student.destroy({
      where: { id: req.params.planId },
    });

    return res.status(200).json('ok');
  }
}

export default new StudentController();
