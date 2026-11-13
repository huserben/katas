import { readFileSync } from "node:fs";
import { TimeTrackingService } from "./TimeTrackingService.ts";

const path = process.argv[2];

if (path === undefined) {
  process.stderr.write("Usage: pnpm start <file>\n");
  process.exit(1);
}

try {
  const service = new TimeTrackingService();

  const activities = service.parseActivities(readFileSync(path, "utf8"));

  for (const entry of service.generateSummary(activities)) {
    process.stdout.write(`${entry.activity} ${entry.durationInMin} min\n`);
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
