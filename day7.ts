const part: number = Number(Deno.args[0] || 1);

const inputRaw: string[][] = Deno.readTextFileSync("input.txt")
    .split("\n")
    .map((line) => line.split(""));

const charMap = {
    "S": 1,
    ".": 0,
    "^": -1,
}

function mapCharacter(ch: string): number {
    switch (ch) {
        case "S": return 1;
        case ".": return 0;
        case "^": return -1;
        default: throw "foreign item in the bagging area";
    }
}

function unmapCharacter(n: number): string {
    switch (n) {
        case 0:  return ".";
        case -1: return "^";
        default: return String(n);
    }
}


switch (part) {
    case 1: {
        let count = 0;
        const input = inputRaw;
        for (let i = 0; i < input.length; i++) {
            if (i === 0) {
                input[i] = input[i].map((x) => x === "S" ? "|" : x);
                continue;
            }

            for (let j = 0; j < input[0].length; j++) {
                switch (input[i-1][j] + input[i][j]) {
                    case "|.":
                        input[i][j] = "|";
                        break;
                    case "|^":
                        if (input[i][j-1] === ".") {
                            input[i][j-1] = "|";
                        }
                        if (input[i][j+1] === ".") {
                            input[i][j+1] = "|";
                        }
                        count++;
                        break;
                }
            }
        }

        console.log("count:", count);
        
        break;
    }
    case 2: {
        const input: number[][] = inputRaw.map((line) => line.map(mapCharacter));
        for (let i = 0; i < input.length; i++) {
            if (i === 0) {
                continue;
            }

            for (let j = 0; j < input[0].length; j++) {
                if (input[i-1][j] > 0) {
                    switch (input[i][j]) {
                        case -1:
                            input[i][j-1] += input[i-1][j];
                            input[i][j+1] += input[i-1][j];
                            break;
                        default:
                            input[i][j] += input[i-1][j];
                            break;
                    }
                }
            }
        };

        console.log("total:", input.pop()?.reduce((acc, cur) => acc + cur, 0));

        break;
    }   
}