import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    // const user = await User.create(req.body);
    const { id, name, email, phone, provider } = await User.create(req.body);
    return res.json({ id, name, email, phone, provider });
  }

  async update(req, res) {
    console.log('id => ', req.userId);
    return res.json({ ok: 'ok' });
  }
}

export default new UserController();
