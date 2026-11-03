// Thin I/O shell: read args + stdin, call the core, write stdout. No logic here.
import { text } from "node:stream/consumers";
import { run } from "./app.ts";

const stdin = process.stdin.isTTY ? "" : await text(process.stdin);
process.stdout.write(`${run(stdin, process.argv.slice(2))}\n`);
