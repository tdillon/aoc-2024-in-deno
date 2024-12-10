const input = (await Deno.readTextFile('input/9.txt'))
const blocks = []
let isFile = true
let solution = 0


for (let i = 0; i < input.length; ++i) {
    const f = +input[i]

    for (let j = 0; j < f; ++j) {
        blocks.push(isFile ? { id: i / 2 } : null)
    }

    isFile = !isFile
}

for (let f = 0, e = blocks.length - 1; f < e;) {
    while (blocks[f] !== null) {
        ++f
    }
    while (blocks[e] === null) {
        --e
    }
    blocks[f] = blocks[e]
    blocks.splice(e,1)
    --e
}

 for (let i = 0; blocks[i]; ++i) {
    solution += i * blocks[i]?.id!
 }

console.log('Day 9 part 1', solution)