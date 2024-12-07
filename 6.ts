const input = (await Deno.readTextFile('input/6.txt')).split('\n').map(r => r.split(''))
const numRows = input.length
const numCols = input[0].length
let currentRow!: number
let currentCol!: number
const direction = ['^', '>', 'v', '<']

for (let row = 0; currentRow === undefined && row < numRows; ++row) {
    for (let col = 0; currentRow === undefined && col < numCols; ++col) {
        if (direction.some(c => c === input[row][col])) {
            currentRow = row
            currentCol = col
        }
    }
}

function move(r: number, c: number): number {
    const cur = input[r][c]
    let nextRow!: number
    let nextCol!: number

    if (cur === '^') {
        nextRow = r - 1
        nextCol = c
    } else if (cur === '>') {
        nextRow = r
        nextCol = c + 1
    } else if (cur === 'v') {
        nextRow = r + 1
        nextCol = c
    } else if (cur === '<') {
        nextRow = r
        nextCol = c - 1
    }

    const nextPos = input[nextRow][nextCol]

    if (nextPos === '#') {  //hit something, turn right
        input[r][c] = direction[(direction.indexOf(cur) + 1) % 4]!
        return 0 + move(r, c)
    } else if (nextPos === '.') { //new space
        input[r][c] = 'X'
        input[nextRow][nextCol] = cur
        return 1 + move(nextRow, nextCol)
    } else if (nextPos === 'X') {  // already visited
        input[r][c] = 'X'
        input[nextRow][nextCol] = cur
        return 0 + move(nextRow, nextCol)
    } else { // undefined, off the map, done
        return 1
    }
}

console.log('Day 6 part 1', move(currentRow, currentCol))
