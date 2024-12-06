const input = await Deno.readTextFile('input/3.txt')

const x = input.match(/mul\(\d{1,3},\d{1,3}\)/g)

function getMulInstructionValue(mulInstruction: string): number {
    return mulInstruction.replace('mul(', '')
        .replace(')', '')
        .split(',')
        .map(v => +v)
        .reduce((prev, cur) => prev * cur)
}

console.log('Day 3 part 1',
    x?.map(val => getMulInstructionValue(val)).reduce((prev, cur) => prev + cur, 0)
)

const y = input.match(/(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don\'t\(\))/g)!

let enabled = true

let solution = 0;

for (const a of y) {
    if (a.startsWith('do(')) {
        enabled = true
    } else if (a.startsWith('don\'t(')) {
        enabled = false
    } else if (enabled) {
        solution += getMulInstructionValue(a)
    }
}

console.log('Day 3 part 2', solution)