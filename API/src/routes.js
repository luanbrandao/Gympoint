import { Router } from 'express';
// import User from './app/models/User';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// routes.get('/', (req, res) => res.json({ message: 'hello Rocktseat!' }));

// routes.get('/', async (req, res) => {
//   const user = await User.create({
//     name: 'Diego',
//     email: 'deigo@gmail.com',
//     phone: '123123',
//     password_hash: '123123',
//   });
//   return res.json(user);
// });

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

export default routes;
