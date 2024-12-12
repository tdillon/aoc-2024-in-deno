const input = (await Deno.readTextFile('input/11.txt')).trim().split(' ').map(s => +s)

for (let blink = 0; blink < 25; ++blink) {
    for (let s = 0; s < input.length; ++s) {
        if (input[s] === 0) {
            input[s] =1
        } else if (input[s].toString().length % 2 === 0) {
            const str = input[s].toString()
            input[s] = +str.substring(0, str.length / 2)
            input.splice(s + 1,0,+str.substring(str.length / 2))
            ++s
        } else {
            input[s] *= 2024
        }
    }
}

console.log('Day 11 part 1', input.length)
