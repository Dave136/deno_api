import * as flags from 'https://deno.land/std/flags/mod.ts';

const { args } = Deno;
const argPort = flags.parse(args).port;

export const PORT =  argPort ? Number(argPort) : 3000;
export const FILE_PATH = './data/tasks.json';