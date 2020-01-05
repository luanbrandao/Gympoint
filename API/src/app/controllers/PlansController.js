import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlansController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos Inválidos' });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({ title, duration, price });
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const limit = 6;

    const plans = await Plan.findAll({
      order: ['title'],
      limit,
      offset: (page - 1) * limit,
    });
    return res.json({ plans });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos Inválidos' });
    }

    const plant = await Plan.findByPk(req.params.planId);

    if (!plant) {
      return res.status(401).json({ error: 'O plano não existe!' });
    }

    const { title, duration, price } = await plant.update(req.body);

    return res.json({ title, duration, price });
  }

  async delete(req, res) {
    const plant = await Plan.findByPk(req.params.planId);

    if (!plant) {
      return res.status(401).json({ error: 'O plano não existe!' });
    }

    await plant.destroy({
      where: { id: req.params.planId },
    });

    return res.status(200).json(plant);
  }
}

export default new PlansController();
