const part: number = Number(Deno.args[0] || 1);

type Vector2d = [number, number];

const input: Vector2d[] = Deno.readTextFileSync("input.txt")
    .split("\n")
    .map((line) => 
        <Vector2d>line.split(",").map(Number)
    );

switch (part) {
    case 1: {
        let largest = 0;
        for (let i = 0; i < input.length - 1; i++) {
            const a = input[i];
            for (let j = i+1; j < input.length; j++) {
                const b = input[j];

                const area = getArea(a, b);
                if (area > largest) largest = area;
            }
        }

        console.log("largest:", largest);
        break;
    }
    case 2: {
        throw "not implemented yet";
        const xs = input.map((x) => x[0]);
        const ys = input.map((x) => x[1]);

        console.log(xs);
        console.log(ys);

        const minx = Math.min(...xs);
        const maxx = Math.max(...xs);
        const miny = Math.min(...ys);
        const maxy = Math.max(...ys);

        console.log(maxx);
        console.log(maxy);

        const pointsInside: Set<string> = new Set();

        for (let y = miny; y <= maxy; y++) {
            for (let x = minx; x <= maxx; x++) {
                if (pointInShape([x, y], input)) pointsInside.add(`${x},${y}`);
            }
        }

        console.log(pointsInside.size);

        const map = new Array(maxy + 2).fill(null).map(() => new Array(maxx + 2).fill("."));

        for (const point of pointsInside) {
            const [x, y] = <Vector2d>point.split(",").map(Number);
            map[y][x] = "X";
        }

        for (const row of map) {
            console.log(row.join(""));
        }

        break;
    }
}

function getArea(a: Vector2d, b: Vector2d): number {
    const vlength = Math.max(a[1], b[1]) - Math.min(a[1], b[1]) + 1;
    const hlength = Math.max(a[0], b[0]) - Math.min(a[0], b[0]) + 1;
    const area = vlength * hlength;
    return area;
}

function pointOnSegment(px: number, py: number,
                        x1: number, y1: number,
                        x2: number, y2: number): boolean {
    
    if ((x2 - x1) * (py - y1) !== (y2 - y1) * (px - x1)) return false;

    return (
        px >= Math.min(x1, x2) &&
        px <= Math.max(x1, x2) &&
        py >= Math.min(y1, y2) &&
        py <= Math.max(y1, y2)
    );
}

function pointInShape(point: [number, number], shape: [number, number][]): boolean {
    const [x, y] = point;
    let inside = false;

    for (let i = 0, j = shape.length - 1; i < shape.length; j = i++) {
        const [xi, yi] = shape[i];
        const [xj, yj] = shape[j];

        if (pointOnSegment(x, y, xi, yi, xj, yj)) return true;

        const intersects =
            ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

        if (intersects) inside = !inside;
    }

    return inside;
}
