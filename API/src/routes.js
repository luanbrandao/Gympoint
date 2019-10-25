import { Router } from 'express';
// import User from './app/models/User';
// import Student from './app/models/Student';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import isAdminMiddleware from './app/middlewares/admin';
import StudentController from './app/controllers/StudentController';
import PlansController from './app/controllers/PlansController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinsController from './app/controllers/CheckinsController';

const routes = new Router();

// routes.get('/', (req, res) => res.json({ message: 'hello Rocktseat!' }));

// routes.get('/students', async (req, res) => {
//   const student = await Student.create({
//     name: '1231',
//     email: '1231@gmail.com',
//     phone: '123123',
//     height: 2.3,
//     weight: 1.2,
//     age: 12,
//     active: true,
//   });
//   return res.json(student);
// });

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// authMiddleware, só pega as rotas depois dele
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.post('/plans', PlansController.store);
routes.get('/plans', PlansController.index);
routes.put('/plans/:planId', PlansController.update);
routes.delete('/plans/:planId', PlansController.delete);

routes.post('/registrations', isAdminMiddleware, RegistrationController.store);
routes.get('/registrations', isAdminMiddleware, RegistrationController.index);
routes.delete(
  '/registrations/:registrationId',
  isAdminMiddleware,
  RegistrationController.delete
);
routes.put(
  '/registrations/:registrationId',
  isAdminMiddleware,
  RegistrationController.update
);

routes.post('/students/:student_id/checkins', CheckinsController.store);

export default routes;
