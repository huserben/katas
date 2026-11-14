export type FrameType = "Strike" | "Spare" | "Regular" | "Incomplete" | "Bonus";

export class Frame {
  private readonly shots: number[] = [];

  constructor(public frameId: number = 0) {}

  public addRoll(roll: string): void {
    switch (roll) {
      case "X":
        this.shots.push(10);
        break;
      case "/":
        {
          const firstShot = this.shots[0] ?? 0;
          this.shots.push(10 - firstShot);
        }
        break;
      case "-":
        this.shots.push(0);
        break;
      default:
        this.shots.push(Number(roll));
    }
  }

  public getScore(): number {
    return this.shots.reduce((acc, shot) => acc + shot, 0);
  }

  public getShotScore(shotIndex: number): number {
    return this.shots[shotIndex] ?? 0;
  }

  public canHoldMoreRolls(): boolean {
    const frameType = this.getType();

    if (
      frameType === "Strike" ||
      frameType === "Spare" ||
      frameType === "Regular"
    ) {
      return false;
    }

    return this.shots.length < 2;
  }

  public getType(): FrameType {
    const score = this.getScore();

    // Regular game has 10 frames, if we end with Spare/Strike in the 10th frame, we get bonus shots, which are not counted as a regular frame.
    if (this.frameId > 9) {
      return "Bonus";
    }

    if (score === 10) {
      return this.shots.length === 1 ? "Strike" : "Spare";
    }

    return this.shots.length === 2 ? "Regular" : "Incomplete";
  }
}
