import { Router } from 'https://deno.land/x/oak/mod.ts';

// All routes
import * as ctrl from './controllers/index.js';

const router = new Router();

router.get('/', ({ response }) => {
  response.body = 'Tasks API';
})

router
  .get('/tasks', ctrl.getTasks)
  .post('/tasks', ctrl.postTask)
  .delete('/task/:id', ctrl.deleteTask)
  .put('/task/:id', ctrl.putTask);

export default router;