import * as Yup from 'yup';
import Student from '../models/Student';

class SessionStudentController {
  async store(req, res) {
    const schema = Yup.object({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos Inválidos' });
    }

    const { id } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(401).json({ error: 'O estudante não existe!' });
    }

    return res.json({ student });
  }
}

export default new SessionStudentController();
