import { text } from "node:stream/consumers";

process.stdout.write("Hello world\n");
const input = await text(process.stdin);
process.stdout.write(input);
