import { FILE_PATH } from '../../config.js'

export default async ({ response }) => {
  const decoder = new TextDecoder();

  try {
    const data = await Deno.readFile(FILE_PATH)
    const tasks = JSON.parse(decoder.decode(data))

    response.status = 200 // OK
    response.body = {status: 'Success', tasks}
  } catch (e) {
    response.status = 501
    response.body = {status: 'Tasks not found', tasks: []}
  }
}
