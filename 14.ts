const input = (await Deno.readTextFile('input/14.txt'))
    .split('\n')
    .map(r => {
        const [px, py, vx, vy] = r.replace('p=', '').replace(' v=', ',').split(',').map(s => +s)
        return { px, py, vx, vy }
    })
const numRows = 103
const numCols = 101
const midCol = 50
const midRow = 51

for (let t = 0; t < 100; ++t) {
    input.forEach(r => {
        r.px = ((r.px + r.vx) + numCols) % numCols
        r.py = ((r.py + r.vy) + numRows) % numRows
    })
}

const solution = input.reduce((prev, cur) => {
    if (cur.px < midCol) {
        if (cur.py < midRow) {
            ++prev.nw
        } else if (cur.py > midRow) {
            ++prev.sw
        }
    } else if (cur.px > midCol) {
        if (cur.py < midRow) {
            ++prev.ne
        } else if (cur.py > midRow) {
            ++prev.se
        }
    }
    return prev
}, { nw: 0, ne: 0, sw: 0, se: 0 })

console.log('Day 14 part 1', solution.ne * solution.nw * solution.se * solution.sw)
