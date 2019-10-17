import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ hello: 'hello ok' }));

export default routes;
