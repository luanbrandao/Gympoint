import Student from "../models/Student";
import * as Yup from 'yup';

class StudentController {

  async store(req,res) {

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      // valida o numero de telefone
      phone: Yup.string().matches(phoneRegExp ,  'Phone number is not valid')
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }


  const studentExists = await Student.findOne({ where: { email: req.body.email } });

  if (studentExists) {
    return res.status(400).json({ error: 'Student already exists.' });
  }

  const { name ,email, phone, height, weight, date_birth, active,}
      = await Student.create(req.body);
      return res.json({ name, email, phone, height, weight, date_birth, active,});
  }

  async update(req,res) {

    const { id , email } = req.body;

    if (!id) {
      return res.status(401).json({ error: 'Id required' });
    }

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

    const { name , phone, height, weight, date_birth, active,} = await student.update(req.body);
    return res.json({ name ,email, phone, height, weight, date_birth, active,});
  }


}

export default new StudentController();
