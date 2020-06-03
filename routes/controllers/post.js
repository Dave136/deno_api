import { FILE_PATH } from "../../config.js"

export default async ({ request, response }) => {
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()

  try {
    const {value:{ title }} = await request.body()
    const data = await Deno.readFile(FILE_PATH)
    const tasks = JSON.parse(decoder.decode(data))

    const newTask = {id: tasks.length, title, done: false}

    tasks.push(newTask)

    await Deno.writeFile(FILE_PATH, encoder.encode(JSON.stringify(tasks)))

    response.status = 200
    response.body = {
      status: 'Success',
      newTask
    }
  } catch (e) {
    response.status = 500
    response.body = {status: 'Failed', e}
    console.log(e)
  }
}