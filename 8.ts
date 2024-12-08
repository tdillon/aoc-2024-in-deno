const input = (await Deno.readTextFile('input/8.txt')).trim().split('\n').map(r => r.split(''))
const numRows = input.length
const numCols = input[0].length
const antinodes: boolean[][] = []
let solution = 0

for (let r = 0; r < numRows; ++r) {
    antinodes.push(new Array(numCols).fill(false))
}

for (let r = 0; r < numRows; ++r) {
    for (let c = 0; c < numCols; ++c) {
        const node = input[r][c]
        if (node !== '.') {
            for (let r2 = 0; r2 < numRows; ++r2) {
                for (let c2 = 0; c2 < numCols; ++c2) {
                    if (r === r2 && c === c2) {
                        continue
                    }
                    const node2 = input[r2][c2]
                    if (node === node2) {
                        const antinodeRow = r + (r - r2)
                        const antinodeCol = c + (c - c2)
                        if (antinodeRow >= 0 &&
                            antinodeRow < numRows &&
                            antinodeCol >= 0 &&
                            antinodeCol < numCols &&
                            !antinodes[antinodeRow][antinodeCol]) {
                            ++solution
                            antinodes[antinodeRow][antinodeCol] = true
                        }
                    }
                }
            }
        }
    }
}

console.log('Day 8 part 1', solution)
