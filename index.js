import { Application } from 'https://deno.land/x/oak/mod.ts'
import * as flags from 'https://deno.land/std/flags/mod.ts'
import router from './router.js'

const { args } = Deno
const argPort = flags.parse(args).port
const PORT = argPort ? Number(argPort) : 3000


const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())



console.log(`Server running at http://localhost:${PORT}`)
await app.listen({ port: PORT })