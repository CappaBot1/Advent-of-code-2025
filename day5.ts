/*
    TODO: PART 2
    Make a queue of ranges before

    If a range passes all conflict checks,
        add it to correct array
    else
        add resolutions to end of before ranges array

    Exit once empty
*/

const part: number = Number(Deno.args[0] || 1);

const input = Deno.readTextFileSync("input.txt").split("\n\n");

const ranges = input[0]
    .split("\n")
    .map((line) => {
        return line.split("-").map(Number);
    });

switch (part) {
    case 1: {
        const ingredientsIDs = input[1]
            .split("\n")
            .map(Number);

        let count = 0;

        for (const ingredientID of ingredientsIDs) {
            for (const range of ranges) {
                const [low, high] = range;

                if (ingredientID >= low && ingredientID <= high) {
                    count++;
                    break;
                }
            }
        };

        console.log("count:", count);
        break;
    }
    case 2: {
        const goodRanges: number[][] = [];
        while (ranges.length > 0) {
            const [low, high] = ranges.shift()!;

            let pass = true;
            for (const realRange of ranges) {
                const [realLow, realHigh] = realRange;

                if (low > high) throw "invalid id range";

                if (low === realLow && high === realHigh) {
                    pass = false;
                    break;
                }

                if (high >= realLow - 1 || low <= realHigh + 1) {
                    pass = false;
                    ranges.push([Math.min(low, realLow), Math.max(high, realHigh)]);
                    break;
                }
                else {
                    throw "edge case???"
                }
            }

            if (pass) {
                goodRanges.push([low, high]);
            }
        }

        let total = 0;

        for (const range of goodRanges) {
            total += range[1] - range[0] + 1;
        }

        console.log("total:", total);

        break;
    }
}
