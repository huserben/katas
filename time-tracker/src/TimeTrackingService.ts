type ActivityResult =
  | {
      ok: true;
      activity: Activity;
    }
  | {
      ok: false;
      reason: string;
    };

export type Activity = {
  type: string;
  start: number;
};

export type ActivitySummary = {
  activity: string;
  durationInMin: number;
}[];

export class TimeTrackingService {
  public parseActivities(input: string): Activity[] {
    const activities: Activity[] = [];

    for (const line of input.split("\n")) {
      const activityResult = this.parseActivity(line);

      if (!activityResult.ok) {
        throw new Error(`Could not parse input: ${activityResult.reason}`);
      }

      activities.push(activityResult.activity);
    }

    const lastActivity = activities[activities.length - 1];
    if (lastActivity && lastActivity.type !== "end") {
      throw new Error(`Last activity must be end: ${lastActivity.type}`);
    }

    return activities;
  }

  public generateSummary(activities: Activity[]): ActivitySummary {
    const activityMap = new Map<string, number>();

    for (let index = 0; index < activities.length - 1; index++) {
      const activity = activities[index];

      if (activity === undefined) {
        continue;
        // TBD if we want to error - later
      }

      if (!activityMap.has(activity.type)) {
        activityMap.set(activity.type, 0);
      }

      const nextActivity = activities[index + 1];
      const duration = (nextActivity?.start ?? 0) - activity.start;

      const currentDuration = activityMap.get(activity.type) ?? 0;
      activityMap.set(activity.type, currentDuration + duration);
    }

    const summary: { activity: string; durationInMin: number }[] = [];

    for (const [activity, duration] of activityMap) {
      summary.push({
        activity: activity,
        durationInMin: duration,
      });
    }

    return summary;
  }

  parseActivity(input: string): ActivityResult {
    const markerIndex = input.indexOf(" ");

    const activityType = input.slice(markerIndex + 1).trim();

    if (activityType === "") {
      return { ok: false, reason: "activity is missing" };
    }

    const time = input.slice(0, markerIndex).split(":");
    const hoursSinceMidnight = Number(time[0]);
    const minutes = Number(time[1]);

    if (Number.isNaN(hoursSinceMidnight) || Number.isNaN(minutes)) {
      return { ok: false, reason: "time is missing" };
    }

    return {
      ok: true,
      activity: {
        type: activityType,
        start: hoursSinceMidnight * 60 + minutes,
      },
    };
  }
}
