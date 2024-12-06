const input = await Deno.readTextFile('input/3.txt')

const x = input.match(/mul\(\d{1,3},\d{1,3}\)/g)

console.log('Day 3 part 1',
    x?.map(val => val
        .replace('mul(', '')
        .replace(')', '')
        .split(',')
        .map(v => +v)
        .reduce((prev, cur) => prev * cur)
    ).reduce((prev, cur) => prev + cur, 0)
)