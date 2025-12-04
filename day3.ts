const part: number = Number(Deno.args[0] || 1);

const input: string[] = Deno.readTextFileSync("input.txt")
    .split("\n");

const numBatteries = 12;

let total = 0;
let highest;

for (const line of input) {
    highest = 0;

    switch (part) {
        case 1:
            for (let i = 0; i < line.length - 1; i++) {
                for (let j = i+1; j < line.length; j++) {
                    const num = Number(line[i] + line[j]);
                    highest = num > highest ? num : highest;
                }
            }
            break;
        case 2: {
            let highStr = "";
            let low = 0;
            let high = line.length - numBatteries + 1;
            while (highStr.length < numBatteries) {
                const [num, index] = findBiggestNumber(
                    line.slice(low, high)
                        .split("")
                        .map(Number)
                );
                highStr = highStr + num;
                low = index + low + 1;
                high++;
            }
            highest = Number(highStr);
            break;
        }
    }
    total += highest;
}

function findBiggestNumber(line: number[]): [number, number] {
    for (let i = 9; i > 0; i--) {
        const index = line.indexOf(i);
        if (index === -1) continue;
        return [i, index];
    }
    throw "no number found";
}

console.log("total:", total);
