const part: number = Number(Deno.args[0] || 1);

const input: string[][] = Deno.readTextFileSync("input.txt")
    .split("\n")
    .map((line) => line.split(""));

const numBatteries = 12;

let total = 0;
let highest;

//const thisToThatCache: Map<string, number> = new Map();
//const encoder = new TextEncoder();

for (const line of input) {
    console.log("doing line:", line);
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
        case 2:
            // EVIL CODE
            //highest = await thisToThat(0, line.length - numBatteries, line, "");

            break;
    }
    //await Deno.stdout.write(encoder.encode("\n"));
    console.log("highest:", highest);
    total += highest;
}

/* SO EVIL, TAKES FOREVER @ 12 BATTERIES
async function thisToThat(start: number, end: number, line: string[], previous: string): Promise<number> {
    const key = `${start},${end},${line.join("")},${previous}`;
    let res = thisToThatCache.get(key);
    if (res === undefined) {
        //await Deno.stdout.write(encoder.encode(","));
        if (previous.length === numBatteries) {
            const num = parseInt(previous);
            res = num;
        }
        else {
            let highest = 0;
            for (let i = start; i <= end; i++) {
                const num = await thisToThat(i + 1, end + 1, line, previous + line[i]);
                highest = Math.max(highest, num);
            }
            res = highest;
        }
        thisToThatCache.set(key, res);
    } else {
        //await Deno.stdout.write(encoder.encode("."));
    }
    return res;
}
console.log(thisToThatCache)
*/

console.log("total:", total);