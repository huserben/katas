import { text } from "node:stream/consumers";
import { TransactionService } from "./transactionService.ts";

const service = new TransactionService();
const stdin = await text(process.stdin);
process.stdout.write(`${service.split(stdin)}\n`);
