import Student from "../models/Student";

class StudentController {

  async store(req,res) {

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
