export class Calculator {
    add(numbers: string): number {
        if (numbers.length === 0) {
            return 0;
        }

        const addends = numbers.split(",").map(x => Number.parseInt(x, 10));

        let result = 0;
        for (const addend of addends){
            result += addend;
        }

        return result;
    }
}