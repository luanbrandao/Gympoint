import { Router } from 'express';
// import User from './app/models/User';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import Student from './app/models/Student';

const routes = new Router();

// routes.get('/', (req, res) => res.json({ message: 'hello Rocktseat!' }));

routes.get('/students', async (req, res) => {
  const student = await Student.create({
    name: '1231',
    email: '1231@gmail.com',
    phone: '123123',
    height: 2.3,
    weight: 1.2,
    age: 12,
    active: true,
  });
  return res.json(student);
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// authMiddleware, só pega as rotas depois dele
routes.use(authMiddleware);
routes.put('/users', UserController.update);

export default routes;
