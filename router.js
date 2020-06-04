import { Router } from 'https://deno.land/x/oak/mod.ts'

const router = new Router()

router.get('/', ({response}) => {
  response.body = {
    status: 'Success',
    message: 'Welcome to Deno API'
  }
})

export default router