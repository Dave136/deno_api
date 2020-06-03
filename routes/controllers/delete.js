import { FILE_PATH } from "../../config.js"

export default async ({ response, params }) => {
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()

  try {
    
    const data = await Deno.readFile(FILE_PATH)
    const tasks = JSON.parse(decoder.decode(data))

    const updatedTasks = tasks.map(task => task.id !== Number(params.id) && task).filter(task => task)

    await Deno.writeFile(FILE_PATH, encoder.encode(JSON.stringify(updatedTasks)))

    response.status = 201
    response.body = {status: 'Success', tasks: updatedTasks}

  } catch (e) {
    response.status = 501
    response.body = {status: 'Failed to delete', e}
    console.log(e)
  }
}