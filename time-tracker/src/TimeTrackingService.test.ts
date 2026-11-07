import { describe, expect, it } from "vitest";
import { TimeTrackingService } from "./TimeTrackingService.ts";

describe("TimeTrackingService Acceptance Tests", () => {
  it("returns summary for day input", () => {
    const timeTrackingService = new TimeTrackingService();

    const rawInput = `09:00 standup
09:15 coding
12:00 lunch
13:00 coding
17:00 end`;
    const activities = timeTrackingService.parseActivities(rawInput);

    expect(timeTrackingService.generateSummary(activities)).toEqual([
      { activity: "standup", durationInMin: 15 },
      { activity: "coding", durationInMin: 405 },
      { activity: "lunch", durationInMin: 60 },
    ]);
  });
});

describe("TimeTrackingService Unit Tests", () => {
  it("parses a line with an activity correctly", () => {
    const timeTrackingService = new TimeTrackingService();

    const activity = timeTrackingService.parseActivity("09:00 standup");

    expect(activity).toEqual({
      ok: true,
      activity: { type: "standup", start: 540 },
    });
  });

  it("refuses to parse a line with no time", () => {
    const timeTrackingService = new TimeTrackingService();

    const activity = timeTrackingService.parseActivity("standup");

    expect(activity).toEqual({ ok: false, reason: "time is missing" });
  });

  it("refuses to parse a line with no activity", () => {
    const timeTrackingService = new TimeTrackingService();

    const activity = timeTrackingService.parseActivity("09:00 ");

    expect(activity).toEqual({ ok: false, reason: "activity is missing" });
  });

  it("parses multiple activities correctly", () => {
    const timeTrackingService = new TimeTrackingService();
    const input = `09:00 standup
09:15 coding
12:00 lunch
12:05 end`;

    const activities = timeTrackingService.parseActivities(input);

    expect(activities).toEqual([
      { type: "standup", start: 540 },
      { type: "coding", start: 555 },
      { type: "lunch", start: 720 },
      { type: "end", start: 725 },
    ]);
  });

  it("throws error if any line could not be parsed correctly", () => {
    const timeTrackingService = new TimeTrackingService();
    const input = `09:00 standup
Edna Krababbel
12:00 lunch`;

    expect(() => timeTrackingService.parseActivities(input)).toThrow(
      "Could not parse input",
    );
  });

  it("throws if last activity is not end", () => {
    const timeTrackingService = new TimeTrackingService();
    const input = `09:00 standup
09:15 coding
12:00 lunch`;

    expect(() => timeTrackingService.parseActivities(input)).toThrow(
      "Last activity must be end: lunch",
    );
  });

  it("generate summary returns sum of activities", () => {
    const timeTrackingService = new TimeTrackingService();

    const activities = [
      { type: "coding", start: 100 },
      { type: "lunch", start: 120 },
      { type: "coding", start: 130 },
      { type: "end", start: 140 },
    ];

    const summary = timeTrackingService.generateSummary(activities);

    expect(summary).toEqual([
      {
        activity: "coding",
        durationInMin: 30,
      },
      { activity: "lunch", durationInMin: 10 },
    ]);
  });
});
