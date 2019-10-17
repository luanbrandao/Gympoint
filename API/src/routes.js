import { Router  } from 'express';

const routes = new Router();

routes.get('/', (req, res) =>{
    return res.json({hello : 'hello word'})
});

export default  routes;