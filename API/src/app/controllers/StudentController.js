import Student from "../models/Student";

class StudentController {

  async store(req,res) {
   const { name ,email, phone, height, weight, age, active,}
      = await Student.create(req.body);
      return res.json({ name, email, phone, height, weight, age, active,});
  }

}

export default new StudentController();
