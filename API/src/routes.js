import { Router } from 'express';
// import User from './app/models/User';
// import Student from './app/models/Student';
import multer from 'multer';
import muterConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import isAdminMiddleware from './app/middlewares/admin';
import StudentController from './app/controllers/StudentController';
import PlansController from './app/controllers/PlansController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinsController from './app/controllers/CheckinsController';
import HelpOrdersStudentController from './app/controllers/HelpOrdersStudentController';
import UnansweredHelpOrders from './app/controllers/UnansweredHelpOrders';
import FileController from './app/controllers/FileController';
import HelpOrderstController from './app/controllers/HelpOrderstController';

const routes = new Router();
const upload = multer(muterConfig);
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
routes.post('/students/:student_id/checkins', CheckinsController.store);
// authMiddleware, só pega as rotas depois dele
routes.use(authMiddleware);

// routes.post('/files', upload.single('file'), (req, res) => {
//   return res.json({ ok: true });
// });
routes.post('/files', upload.single('file'), FileController.store);

routes.put('/users', UserController.update);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.post('/plans', isAdminMiddleware, PlansController.store);
routes.get('/plans', isAdminMiddleware, PlansController.index);
routes.put('/plans/:planId', isAdminMiddleware, PlansController.update);
routes.delete('/plans/:planId', isAdminMiddleware, PlansController.delete);

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

routes.get('/students/:student_id/checkins', CheckinsController.index);
routes.get(
  '/students/:student_id/help-orders',
  HelpOrdersStudentController.index
);
routes.get('/students/:student_id/unanswered', UnansweredHelpOrders.index);
routes.post('/unanswered/:help_orders_id', UnansweredHelpOrders.store);
routes.get('/students/:name?', StudentController.index);
routes.get('/help_orders', HelpOrderstController.index);

export default routes;
