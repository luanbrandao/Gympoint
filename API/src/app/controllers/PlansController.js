import * as Yup from 'yup';
import Plans from '../models/Plans';
import Student from '../models/Student';

class PlansController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, duration, price } = await Plans.create(req.body);

    return res.json({ title, duration, price });
  }
}

export default new PlansController();
