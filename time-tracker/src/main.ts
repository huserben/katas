import { createInterface } from "node:readline/promises";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

process.stdout.write("Hello world\n");
const line = await readline.question("> ");
process.stdout.write(`${line}\n`);
readline.close();
