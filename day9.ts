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
        const xs = input.map((x) => x[0]);
        const ys = input.map((x) => x[1]);

        const minx = Math.min(...xs);
        const maxx = Math.max(...xs);
        const miny = Math.min(...ys);
        const maxy = Math.max(...ys);

        const validPoints: boolean[][] = new Array(maxx + 2).fill(null).map(() => new Array(maxy + 2).fill(false));

        //console.log("calculating valid points");
        for (let y = miny; y <= maxy; y++) {
            for (let x = minx; x <= maxx; x++) {
                if (pointInShape([x, y], input)) validPoints[x][y] = true;
            }
        }

        /*const map = validPoints.map((line) => line.map((el) => el ? "X" : "."));

        const trans = map[0].map((_, colIndex) =>
            map.map(row => row[colIndex])
        );

        for (const row of trans) {
            console.log(row.join(""));
        }*/
        
        //console.log("calculating largest");

        let largest = 0;
        for (let i = 0; i < input.length - 1; i++) {
            const a = input[i];
            for (let j = i+1; j < input.length; j++) {
                const b = input[j];

                if (!areaValid(a, b, validPoints)) continue;
                const area = getArea(a, b);
                if (area > largest) {
                    largest = area;
                }
            }
        }

        console.log("largest area:", largest);

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

function areaValid(a: Vector2d, b: Vector2d, validPoints: boolean[][]): boolean {
    let xstart;
    let xend;
    let ystart;
    let yend;

    if (a[0] < b[0]) {
        xstart = a[0];
        xend = b[0];
    } else {
        xstart = b[0];
        xend = a[0];
    }
    if (a[1] < b[1]) {
        ystart = a[1];
        yend = b[1];
    } else {
        ystart = b[1];
        yend = a[1];
    }

    for (let x = xstart; x <= xend; x++) {
        for (let y = ystart; y <= yend; y++) {
            if (!validPoints[x][y]) return false;
        }
    }

    return true;
}
