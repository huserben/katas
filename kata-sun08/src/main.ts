process.stdout.write("Hello world\n");

for await (const chunk of process.stdin) {
  const line = String(chunk).trim();

  if (line === "exit") {
    break;
  }

  process.stdout.write(`${line}\n`);
}
