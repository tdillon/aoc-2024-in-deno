const input = (await Deno.readTextFile('input/12.txt')).trim().split('\n').map(r => r.split(''))
const numRows = input.length
const numCols = input[0].length

const plots: Array<Set<string>> = []

function fillPlot(plot: Set<string>, row: number, col: number) {
    plot.add(`${row},${col}`)
    const cur = input[row][col]
    if (row > 0 && input[row - 1][col] === cur && !plot.has(`${row-1},${col}`)) {
        fillPlot(plot, row - 1, col)
    }
    if (row < numCols - 1 && input[row + 1][col] === cur && !plot.has(`${row+1},${col}`)) {
        fillPlot(plot, row + 1, col)
    }
    if (col > 0 && input[row ][col-1] === cur && !plot.has(`${row},${col - 1}`)) {
        fillPlot(plot, row, col -1)
    }
    if (col < numCols - 1 && input[row ][col+1] === cur && !plot.has(`${row},${col + 1}`)) {
        fillPlot(plot, row, col +1)
    }
}

for (let r = 0; r < numRows; ++r) {
    for (let c = 0; c < numCols; ++c) {
        if (!plots.some(p => p.has(`${r},${c}`))) {
            const plot = new Set<string>()
            plots.push(plot)
            fillPlot(plot, r, c)
        }
    }
}

function getPerimeter(p:number[][]) {
    const type = input[p[0][0]][p[0][1]]
    let perimeter = 0
    for (const a of p) {
        const [r,c] = a
        if (r === 0 || input[r -1][c] !== type) {
            ++perimeter
        }
        if (r === numRows - 1 || input[r + 1][c] !== type) {
            ++perimeter
        }
        if (c === 0 || input[r ][c -1] !== type) {
            ++perimeter
        }
        if (c === numCols - 1 || input[r ][c + 1] !== type) {
            ++perimeter
        }
    }
    return perimeter
}

let solution = 0

for (const plot of plots) {
    const x = [...plot].map(a => a.split(',').map(a => +a))
    solution += (x.length * getPerimeter(x))
    console.log(JSON.stringify(x), x.length, getPerimeter(x), x.length * getPerimeter(x))
}

console.log('Day 12 part 1', solution)
