import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { FILE_PATH } from '../../config.js';

export async function getTasks({ response }) {
  const decoder = new TextDecoder();

  try {
    const data = await Deno.readFile(FILE_PATH);
    const tasks = JSON.parse(decoder.decode(data));

    response.status = 200; // OK
    response.body = { status: 'Success', tasks };
  } catch (e) {
    response.status = 501;
    response.body = { status: 'Tasks not found', tasks: [] };
  }
}

export async function getTaskById({ response, params }) {
  const decoder = new TextDecoder();
  try {
    const data = await Deno.readFile(FILE_PATH)
    const tasks = JSON.parse(decoder.decode(data))

    const item = tasks.filter(task => task.id === params.id)

    console.log(item)
    response.status = 200;
    response.body = {
      status: 'Success',
      task: item
    };
  } catch (e) {
    response.status = 500;
    response.body = {status: 'Task not found', e};
    console.log(e);
  }
}

export async function postTask({ request, response }) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  try {
    const {
      value: { title },
    } = await request.body();
    const data = await Deno.readFile(FILE_PATH);
    const tasks = JSON.parse(decoder.decode(data));

    const newTask = { id: v4.generate(), title, done: false };

    tasks.push(newTask);

    await Deno.writeFile(FILE_PATH, encoder.encode(JSON.stringify(tasks)));

    response.status = 200;
    response.body = {
      status: 'Success',
      newTask,
    };
  } catch (e) {
    response.status = 500;
    response.body = { status: 'Failed', e };
    console.log(e);
  }
}

export async function deleteTask({ response, params }) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  try {
    const data = await Deno.readFile(FILE_PATH);
    const tasks = JSON.parse(decoder.decode(data));

    const updatedTasks = tasks
      .map((task) => task.id !== params.id && task)
      .filter((task) => task);

    await Deno.writeFile(
      FILE_PATH,
      encoder.encode(JSON.stringify(updatedTasks))
    );

    response.status = 201;
    response.body = { status: 'Success', tasks: updatedTasks };
  } catch (e) {
    response.status = 501;
    response.body = { status: 'Failed to delete', e };
    console.log(e);
  }
}

export async function putTask({ request, response, params }) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  try {
    const {
      value: { title, done = false },
    } = await request.body();
    const data = await Deno.readFile(FILE_PATH);
    const tasks = JSON.parse(decoder.decode(data));

    const updateTasks = tasks.map((task) => {
      if (task.id === params.id) {
        return { ...task, title, done };
      }
      return task;
    });

    await Deno.writeFile(
      FILE_PATH,
      encoder.encode(JSON.stringify(updateTasks))
    );

    response.status = 201;
    response.body = { status: 'Success', tasks: updateTasks };
  } catch (e) {
    response.status = 501;
    response.body = { status: 'Failed to update', e };
    console.log(e);
  }
}
