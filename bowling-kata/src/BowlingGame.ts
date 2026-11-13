export class BowlingGame{

    private readonly scores : Map<number, number[]> = new Map();
    private readonly strikeIndexes : number[] = [];
    private readonly spareIndexes : number[] = [];

    private frameCounter = 0;
    private ballCounter = 0;

    private getFrameByIndex(frameIndex : number): number[]{
        const frame = this.scores.get(frameIndex);

        return frame ?? [];
    }

    private addScoreToFrame(score: number) : void {
        const frame = this.getFrameByIndex(this.frameCounter);

        frame.push(score);
    }

    private getScoreByRollIndex(rollIndex: number): number {
        let remaining = rollIndex;

        for (const values of this.scores.values()) {
            if (remaining < values.length) {
                return values[remaining] ?? -1;
            }

            remaining -= values.length;
        }

        return -1;
    }

    private getScoreForFrame(frameIndex : number) : number {
        const frame = this.getFrameByIndex(frameIndex);

        return frame.reduce((acc, n) => acc + n, 0);
    }

    private initCurrentFrame() : void {
        if (!this.scores.has(this.frameCounter)){
                this.scores.set(this.frameCounter, []);
            }
    }

    private moveToNextFrame() : void {
        this.ballCounter = 0;
        this.frameCounter++;
    }

    private getSpareBonusPoints() : number{
        let spareBonus = 0;
        for (const spareIndex of this.spareIndexes){
            const nextRoll = this.getScoreByRollIndex(spareIndex + 1);
            spareBonus += nextRoll;
        }

        return spareBonus;
    }

    private getStrikeBonusPoints() : number{
        let strikeBonus = 0;

        for (const strikeIndex of this.strikeIndexes){
            const nextRoll = this.getScoreByRollIndex(strikeIndex + 1);
            const afterNextRoll = this.getScoreByRollIndex(strikeIndex + 2);

            strikeBonus += nextRoll + afterNextRoll;
        }

        return strikeBonus;
    }

    private calculateTotalScore() : number{
        let score = 0;
        for (let frameIndex = 0; frameIndex < 10; frameIndex ++){
            score += this.getScoreForFrame(frameIndex);
        }

        score += this.getSpareBonusPoints();
        score += this.getStrikeBonusPoints();

        return score;
    }

    private logStrike(rollIndex : number): void {
        if (this.frameCounter < 10){
            this.strikeIndexes.push(rollIndex)
        }
    }

    private logSpare(rollIndex: number): void{
        if (this.frameCounter < 10){
            this.spareIndexes.push(rollIndex)
        }
    }

    public getGameResults(rolls: string) : number{
        for (let rollIndex = 0; rollIndex < rolls.length; rollIndex++) {
            const roll = rolls[rollIndex];

            this.initCurrentFrame();
            this.ballCounter++;

            switch(roll){
                case "-":
                    this.addScoreToFrame(0);
                    break;
                case "X":
                    this.logStrike(rollIndex);
                    this.addScoreToFrame(10);
                    this.moveToNextFrame();
                    break
                case "/":
                    this.logSpare(rollIndex);
                    this.addScoreToFrame(10 - this.getScoreByRollIndex(rollIndex - 1));
                    this.moveToNextFrame();
                    break;
                default:
                    {
                        const rollScore = Number(roll);
                        if (Number.isNaN(rollScore)){
                            throw new TypeError("Shit happened");
                        }

                        this.addScoreToFrame(rollScore);

                        if (this.ballCounter === 2){
                            this.moveToNextFrame();
                        }
                    }
            }            
        }

        return this.calculateTotalScore();
    }
}