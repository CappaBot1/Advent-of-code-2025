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
        console.error("not implemented");
        break;
        for (const [i, range] of ranges.entries()) {
            const [low, high] = range;

            console.log("------------------");

            for (const [j, realRange] of ranges.entries()) {
                const [realLow, realHigh] = realRange;

                if (i === j) continue;

                console.log("checking:", range, "against:", realRange);

                if (low > high) throw "waaaahh, i'm a crybaby";

                // ( ) [ ]
                // ( ) [ ]
                if (high < realLow) {
                    console.log(1);
                }
                // ( | ]
                //
                // [ ] ( )
                // [ ] ( )
                else if (low > realHigh) {
                    console.log(2);
                }
                // (  [ ) ]
                // (      )
                else if (low < realLow && high >= realLow && high <= realHigh) {
                    console.log(3);
                    ranges.splice(i, 1);
                    ranges.splice(j, 1);
                    ranges.push([low, realLow-1]);
                    break;
                }
                // [ ( ]  )
                // [   ]( )
                else if (low <= realHigh && low >= realLow && high > realHigh) {
                    console.log(4);
                    ranges.splice(i, 1);
                    ranges.push([realHigh+1, high]);
                    break;
                }
                // [ ( ) ]
                // [     ]
                else if (low >= realLow && low <= realHigh && high >= realLow && high <= realHigh) {
                    console.log(5);
                    ranges.splice(i, 1);
                    break;
                }
                // (  [ ]  )
                // ( )[ ]( )
                else if (low < realLow && high > realHigh) {
                    console.log(6);
                    ranges.splice(i, 1);
                    ranges.push([low, realLow-1], [realHigh+1, high]);
                    break;
                }

                else {
                    throw "edging alert"
                }
                //await new Promise((resolve) => {setTimeout(resolve, 100)});

                console.log("ranges:", ranges);
            }
        }

        let total = 0;

        for (const range of ranges) {
            total += range[1] - range[0] + 1;
        }

        console.log("total:", total);

        break;
    }
}