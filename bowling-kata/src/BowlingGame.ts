import { Frame } from "./Frame.js";

export class BowlingGame {
  private readonly frames: Frame[] = [];

  private addNewFrame(frameIndex: number): Frame {
    const frame = new Frame(frameIndex);
    this.frames.push(frame);
    return frame;
  }

  private getCurrentFrame(): Frame {
    const frameIndex = this.frames.length;

    let currentFrame: Frame | undefined;

    if (frameIndex > 0) {
      currentFrame = this.getFrameByIndex(frameIndex - 1);

      const canHoldMoreRolls = currentFrame.canHoldMoreRolls();

      if (canHoldMoreRolls) {
        return currentFrame;
      }
    }

    return this.addNewFrame(frameIndex);
  }

  private addRollToCurrentFrame(roll: string): void {
    const currentFrame = this.getCurrentFrame();
    currentFrame.addRoll(roll);
  }

  private getFrameByIndex(frameIndex: number): Frame {
    const frame = this.frames[frameIndex];

    if (!frame) {
      throw new Error(`Frame with index ${frameIndex} does not exist.`);
    }

    return frame;
  }

  private getNextTwoScores(frameIndex: number): number[] {
    const nextScores: number[] = [];
    const nextFrame = this.getFrameByIndex(frameIndex);
    const nextScore = nextFrame.getShotScore(0);

    nextScores.push(nextScore);

    if (nextFrame.getType() === "Strike") {
      const afterNextFrame = this.getFrameByIndex(frameIndex + 1);
      const afterNextScore = afterNextFrame.getShotScore(0);
      nextScores.push(afterNextScore);
    } else {
      nextScores.push(nextFrame.getShotScore(1));
    }

    return nextScores;
  }

  private calculateBonusScore(): number {
    let bonusScore = 0;
    const bonusFrames = this.frames.filter(
      (frame) => frame.getType() === "Strike" || frame.getType() === "Spare",
    );

    for (const frame of bonusFrames) {
      const nextScores = this.getNextTwoScores(frame.frameId + 1);

      bonusScore += nextScores[0] ?? 0;

      if (frame.getType() === "Strike") {
        bonusScore += nextScores[1] ?? 0;
      }
    }

    return bonusScore;
  }

  private calculateRegularScore(): number {
    return this.frames
      .filter((frame) => frame.getType() !== "Bonus")
      .reduce((acc, frame) => acc + frame.getScore(), 0);
  }

  private calculateTotalScore(): number {
    return this.calculateRegularScore() + this.calculateBonusScore();
  }

  private addRollsToFrames(rolls: string): void {
    for (const roll of rolls) {
      this.addRollToCurrentFrame(roll);
    }
  }

  public getGameResults(rolls: string): number {
    this.addRollsToFrames(rolls);

    return this.calculateTotalScore();
  }
}
