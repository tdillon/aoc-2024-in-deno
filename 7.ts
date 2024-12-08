const input = (await Deno.readTextFile('input/7.txt')).trim().split('\n')
let total = 0

function isPossiblyTrue(value: number, current: number, items: Array<number>): boolean {
    if (value === current && items.length === 0) {
        return true
    } else if (current > value || items.length === 0) {
        return false
    } else {
        return isPossiblyTrue(value, current + items[0], items.slice(1)) ||
            isPossiblyTrue(value, current * items[0], items.slice(1))
    }
}

for (const equation of input) {
    const value = +equation.substring(0, equation.indexOf(':'))
    const items = equation.substring(equation.indexOf(':') + 1).trim().split(' ').map(n => +n)
    if (isPossiblyTrue(value, items[0], items.slice(1))) {
        total += value
    }
}

console.log('Day 7 part 1', total)
