import { Router } from 'https://deno.land/x/oak/mod.ts'

// All routes
import getTasks from './controllers/get.js'
import postTask from './controllers/post.js'
import deleteTask from './controllers/delete.js'
import putTask from './controllers/put.js'


const router = new Router()

router.get('/', ({ response }) => {
  response.body = 'Tasks API'
})

router
  .get('/tasks', getTasks)
  .post('/tasks', postTask)
  .delete('/task/:id', deleteTask)
  .put('/task/:id', putTask)

export default router