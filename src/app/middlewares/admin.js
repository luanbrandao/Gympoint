import User from '../models/User';

export default async (req, res, next) => {
  if (req.userId) {
    const user = await User.findByPk(req.userId);
    console.log('user => ', user);
    if (user.provider === true) {
      return next();
    }
    return res.status(401).json({ error: 'User is not an administrator!' });
  }

  return res.status(401).json({ error: 'Token invalid!' });
};
