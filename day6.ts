const part: number = Number(Deno.args[0] || 1);

const input = Deno.readTextFileSync("input.txt").split("\n");

const numbersss = input
    .slice(0, -1)
    .map((line) => {
        return line.split(" ").filter(Boolean).map(Number);
    });

let numberss: number[][] = [];

switch (part) {
    case 1:
        numberss = transpose(numbersss);
        break;
    case 2: {
        const temp = transpose(
                input
                    .slice(0, -1)
                    .map((line) => {
                        return line.split("");
                    })
            );
        
        const rows: string[][][] = [[]]
        while (temp.length > 0) {
            const num = temp.shift()!;
            if (num?.every((value) => value === " ")) {
                rows.push([]);
            } else {
                rows[rows.length - 1].push(num);
            }
        }
        numberss = rows.map((row) => {
            return row.map((num) => Number(num.join("")));
        });
    }
        
}

const operators = input[input.length-1].split(" ").filter(Boolean);

let grandTotal = 0;
for (let i = 0; i < operators.length; i++) {
    const numbers = numberss[i];
    const operator = operators[i];

    grandTotal += numbers.reduce(
        (prev, curr) => {
            switch (operator) {
                case "+":
                    return prev + curr;
                case "*":
                    return prev * curr;
                default:
                    throw "operator not found: " + operator;
            }
        },
        getInitialValue(operator)
    )
}

function getInitialValue(operator: string): number {
    switch (operator) {
        case "+":
            return 0;
        case "*":
            return 1;
        default:
            return 0;
    }
}

function transpose<T>(arr: T[][]): T[][] {
    if (arr.length === 0) return [];
    return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
}

console.log("grand total:", grandTotal);
