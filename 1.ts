const input = await Deno.readTextFile('input/1.txt')

const x = input.trimEnd().split('\n').map(l => l.split('   ').map(a => +a))
const y = x.map(a => a[0]).sort()
const z = x.map(a => a[1]).sort()

let sum = 0

for (let i = 0; i < y.length; ++i) {
    sum += Math.abs(y[i] - z[i])
}

console.log('Day 1 part 1', sum)