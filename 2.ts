const input = await Deno.readTextFile('input/2.txt')

const x = input.trimEnd().split('\n').map(l => l.split(' ').map(a => +a))

function isValidReport(r: number[]): boolean {
    return r.reduce((prev, cur) => (prev === cur || Math.abs(prev - cur) > 3) ? Number.MAX_SAFE_INTEGER : cur) !== Number.MAX_SAFE_INTEGER &&
        (r.toSorted((a,b)=>a-b).toString() === r.toString() ||
            r.toSorted((a,b)=>a-b).toReversed().toString() === r.toString())
}

console.log(
    x.reduce((prev, cur) => prev + (isValidReport(cur) ? 1 : 0), 0)
)
