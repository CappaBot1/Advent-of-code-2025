const part: number = Number(Deno.args[0] || 1);

const input: [string, number][] = Deno.readTextFileSync("input.txt")
    .split("\n")
    .map((line) => 
        [line[0], Number(line.slice(1))]
    )

let rotation = 50;
let count = 0;

for (const [direction, number] of input) {
    console.log("Going", number, direction);

    switch (part) {
        case 1:
            if (rotation == 0) {
                count++;
            }

            switch (direction) {
                case ("L"):
                    rotation -= number
                    break
                case ("R"):
                    rotation += number
                    break
            }

            rotation = rotation % 100;
            break

        case 2:
            for (let i = 0; i < number; i++) {
                switch (direction) {
                    case ("L"):
                        rotation--;
                        break
                    case ("R"):
                        rotation++;
                        break
                }
                rotation = rotation % 100;
                if (rotation === 0) count++;
            }
            break
    }

    console.log("rotation:", rotation);
}

console.log("count:", count);