const part: number = Number(Deno.args[0] || 1);

type Vector3d = [number, number, number];
type Circuit = Vector3d[];
type Connection = {
    length: number,
    a: Vector3d,
    b: Vector3d,
}

const input: Vector3d[] = Deno.readTextFileSync("input.txt")
    .split("\n")
    .map((line) => {
        const [x, y, z] = line.split(",").map(Number);
        return <Vector3d>[x, y, z];
    });

const iters = input.length <= 100 ? 10 : 1000;

const allConnections: Connection[] = []
for (const [i, a] of input.entries()) {
    for (const [j, b] of input.entries()) {
        if (i <= j) continue;
        const length = getDistance(a, b);
        allConnections.push({
            length, a, b,
        });
    }
}

allConnections.sort((a, b) => a.length - b.length);

const circuits: Circuit[] = [];

switch (part) {
    case 1: {
        outerloop: for (let i = 0; i < iters; i++) {
            const connection = allConnections.shift();
            if (connection === undefined) throw "0H N0";
            let ain, bin = null;
            for (const circuit of circuits) {
                const [a, b] = detectInCircuit(connection, circuit);
                if (a && b) {
                    continue outerloop;
                }
                if (a) {
                    ain = circuit;
                    continue;
                }
                if (b) {
                    bin = circuit;
                    continue;
                }
            }
            if (ain && bin) {
                ain.push(...bin);
                circuits.splice(circuits.findIndex((value) => JSON.stringify(value) === JSON.stringify(bin)), 1);
                continue;
            }
            if (ain) {
                ain.push(connection.b);
                continue;
            }
            if (bin) {
                bin.push(connection.a);
                continue;
            }
            circuits.push([connection.a, connection.b]);
        }

        circuits.sort((a, b) => b.length - a.length);

        console.log("three largest multiplied:", circuits.slice(0, 3).map((x) => x.length).reduce((a, b) => a * b));
        break;
    }
    case 2: {
        let finalA, finalB;
        const iter = allConnections.length;
        outerloop: for (let i = 0; i < iter; i++) {
            const connection = allConnections[i];
            if (connection === undefined) throw "0H N0";
            let ain, bin = null;
            for (const circuit of circuits) {
                const [a, b] = detectInCircuit(connection, circuit);
                if (a && b) {
                    continue outerloop;
                }
                if (a) {
                    ain = circuit;
                    continue;
                }
                if (b) {
                    bin = circuit;
                    continue;
                }
            }

            if (ain && bin) {
                ain.push(...bin);
                finalA = connection.a;
                finalB = connection.b;
                circuits.splice(circuits.indexOf(bin), 1);
                continue;
            }
            if (ain) {
                ain.push(connection.b);
                finalA = connection.a;
                finalB = connection.b;
                continue;
            }
            if (bin) {
                bin.push(connection.a);
                finalA = connection.a;
                finalB = connection.b;
                continue;
            }

            circuits.push([connection.a, connection.b]);
        }

        if (finalA === undefined || finalB === undefined) throw "Finals were undefined";

        console.log("answer:", finalA[0] * finalB[0]);

        break;
    }
}

function detectInCircuit(connection: Connection, circuit: Circuit): [boolean, boolean] {
    let a = false;
    let b = false;
    const ca = connection.a;
    const cb = connection.b;
    for (const thingo of circuit) {
        if (compareVectors(ca, thingo)) a = true;
        if (compareVectors(cb, thingo)) b = true;
    }
    return [a, b];
}

function getDistance(a: Vector3d, b: Vector3d): number {
    return Math.sqrt(
        [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
            .map(x => Math.pow(x, 2))
            .reduce((a, b) => a + b, 0)
    );
}

function compareVectors(a: Vector3d, b: Vector3d): boolean {
    return (
        a[0] === b[0] &&
        a[1] === b[1] &&
        a[2] === b[2]
    );
}