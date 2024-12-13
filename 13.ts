const input = (await Deno.readTextFile('input/13.txt'))
    .split('\n\n')
    .map(m => m.toLowerCase()
        .replaceAll(/\+|\s|[a-z]+/g, '')
        .replace(/^\:|\=/g, '')
        .replaceAll(':', ',')
        .split(',')
        .map(s => +s))

function getCost(m: number[]): number {
    const a = { x: m[0], y: m[1] }
    const b = { x: m[2], y: m[3] }
    const p = { x: m[4], y: m[5] }
    const aTokens = ((b.y * p.x) - (b.x * p.y)) / ((b.y * a.x) - (b.x * a.y))
    const bTokens = ((a.y * p.x) - (a.x * p.y)) / ((a.y * b.x) - (a.x * b.y))

    return Number.isInteger(aTokens) && Number.isFinite(bTokens) ? aTokens * 3 + bTokens : 0
}

const c = input.map(a => getCost(a)).reduce((prev, cur) => prev + cur, 0)

console.log('Day 13 part 1', c)
