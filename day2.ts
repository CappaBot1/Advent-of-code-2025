const part: number = Number(Deno.args[0] || 1);

const input: number[][] = Deno.readTextFileSync("input.txt")
    .split(",")
    .map((line) => {
            return line.split("-")
                .map(Number);
        }
    );

let total = 0;
const invalidIDs: Set<number> = new Set();

for (const [lower, upper] of input) {
    for (let num = lower; num <= upper; num++) {
        const str = String(num);

        switch (part) {
            case 1: {
                if (str.length % 2 !== 0) continue;

                const half = str.length / 2;
                const left = str.slice(0, half);
                const right = str.slice(half);

                if (left !== right) continue;

                total += num;
                break;
            }
            case 2: {
                const half = str.length / 2;

                for (let i = 1; i <= half; i++) {
                    const part = str.slice(0, i);

                    let test = part;

                    while (test.length < str.length) {
                        test += part;
                    }

                    if (test === str) {
                        invalidIDs.add(num);
                        break;
                    }
                }

                total = Array.from(invalidIDs)
                    .reduce((previous, current) => previous + current, 0);

                break;
            }
        }
    }
}

console.log("total:", total);