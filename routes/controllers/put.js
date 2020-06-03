import { FILE_PATH } from "../../config.js"

export default async ({ request, response, params }) => {
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()

  try {
    const {value:{ title, done }} = await request.body()
    const data = await Deno.readFile(FILE_PATH)
    const tasks = JSON.parse(decoder.decode(data))

    const updateTasks = tasks.map(task => {
      if (task.id === Number(params.id)) {
        return {...task, title, done}
      }
      return task
    })

    await Deno.writeFile(FILE_PATH, encoder.encode(JSON.stringify(updateTasks)))

    response.status = 201
    response.body = {status: 'Success', tasks: updateTasks}

  } catch (e) {
    response.status = 501
    response.body = {status: 'Failed to update', e}
    console.log(e)
  }
}