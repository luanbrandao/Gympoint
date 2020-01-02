import User from '../models/User';

export default async (req, res, next) => {
  if (req.userId) {
    const user = await User.findByPk(req.userId);
    console.log('user => ', user);
    if (user.provider === true) {
      return next();
    }
    return res.status(401).json({ error: 'O usuário não é administrador!' });
  }

  return res.status(401).json({ error: 'Token inválido!' });
};
