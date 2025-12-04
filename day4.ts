const part: number = Number(Deno.args[0] || 1);

type vector = [number, number];

const input: string[][] = Deno.readTextFileSync("input.txt")
    .split("\n")
    .map((line) => line.split(""));

const directions: vector[] = [];

for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) continue;
        directions.push([x, y]);
    }
}

function getRemovable(input: string[][]): vector[] {
    const found: vector[] = [];

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (input[x][y] === ".") continue;
            const thing = goDirections(x, y);
            if (thing) found.push(thing);
        }
    }

    return found;
}

function goDirections(x: number, y: number): vector | false {
    let count = 0;
    for (const [dirx, diry] of directions) {
        try {
            if (input[x + dirx][y + diry] === "@") count++;
        } catch (_) {
            // yup
        }
        if (count >= 4) {
            return false;
        }
    }
    return [x, y];
}

switch (part) {
    case 1:
        console.log("total:", getRemovable(input).length);
        break;
    case 2: {
        let prevInput = [];
        let count = 0;
        while (JSON.stringify(prevInput) !== JSON.stringify(input)) {
            prevInput = JSON.parse(JSON.stringify(input));
            const removable = getRemovable(input);
            for (const [x, y] of removable) {
                input[x][y] = ".";
                count++;
            }
        }
        console.log("total:", count);
        break;
    }
}
