const input = await Deno.readTextFile('input/4.txt')

const x = input.split('\n').map(x => x.split(''))
const numRows = x.length
const numCols = x[0].length
let solution = 0

for (let row = 0; row < numRows; ++row) {
    for (let col = 0; col < numCols; ++col) {
        if (x[row][col] === 'X') {
            // Horizontal Forwards
            if (x[row][col + 1] === 'M' &&
                x[row][col + 2] === 'A' &&
                x[row][col + 3] === 'S'
            ) {
                solution += 1
            }
            // Horizontal Backwards
            if (x[row][col - 1] === 'M' &&
                x[row][col - 2] === 'A' &&
                x[row][col - 3] === 'S'
            ) {
                solution += 1
            }
            // Vertical Up
            if (row >= 3 &&
                x[row - 1][col] === 'M' &&
                x[row - 2][col] === 'A' &&
                x[row - 3][col] === 'S'
            ) {
                solution += 1
            }
            // Vertical Down
            if (x[row + 1][col] === 'M' &&
                x[row + 2][col] === 'A' &&
                x[row + 3][col] === 'S'
            ) {
                solution += 1
            }
            // Diagonal NW
            if (row >= 3 &&
                x[row - 1][col - 1] === 'M' &&
                x[row - 2][col - 2] === 'A' &&
                x[row - 3][col - 3] === 'S'
            ) {
                solution += 1
            }
            // Diagonal NE
            if (row >= 3 &&
                x[row - 1][col + 1] === 'M' &&
                x[row - 2][col + 2] === 'A' &&
                x[row - 3][col + 3] === 'S'
            ) {
                solution += 1
            }
            // Diagonal SW
            if (x[row + 1][col - 1] === 'M' &&
                x[row + 2][col - 2] === 'A' &&
                x[row + 3][col - 3] === 'S'
            ) {
                solution += 1
            }
            // Diagonal SE
            if (x[row + 1][col + 1] === 'M' &&
                x[row + 2][col + 2] === 'A' &&
                x[row + 3][col + 3] === 'S'
            ) {
                solution += 1
            }
        }
    }
}

console.log('Day 4 part 1', solution)


