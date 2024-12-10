const input = (await Deno.readTextFile('input/10.txt')).split('\n').map(r => r.split('').map(a => +a))
const numRows = input.length
const numCols = input[0].length
let solution = 0

function getScore(s: Set<string>, row: number, col: number): void {
    const height = input[row][col]

    if (height === 9) {
        s.add(`${row},${col}`)
    } else {
        if (row > 0 && input[row - 1][col] === (height + 1)) {
            getScore(s, row - 1, col)
        }
        if (row < numRows - 1 && input[row + 1][col] === (height + 1)) {
            getScore(s, row + 1, col)
        }
        if (col > 0 && input[row][col - 1] === (height + 1)) {
            getScore(s, row, col - 1)

        }
        if (col < numCols - 1 && input[row][col + 1] === (height + 1)) {
            getScore(s, row, col + 1)
        }
    }
}

for (let r = 0; r < numRows; ++r) {
    for (let c = 0; c < numCols; ++c) {
        if (input[r][c] === 0) {
            const unique9s = new Set<string>()
            getScore(unique9s, r, c)
            solution += unique9s.size
        }
    }
}

console.log('Day 10 part 1', solution)
