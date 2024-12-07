const input = (await Deno.readTextFile('input/5.txt')).split('\n')

const rules = new Set<string>()

let solutionP1 = 0
let solutionP2 = 0

for (const line of input) {
    if (line[2] === '|') {
        rules.add(line)
    } else if (line[2] === ',') {
        const update = line.split(',')
        let isCorrect = true

        for (let i = 0; isCorrect && i < update.length - 1; ++i) {
            for (let j = i + 1; isCorrect && j < update.length; ++j) {
                if (rules.has(`${update[j]}|${update[i]}`)) {
                    isCorrect = false
                }
            }
        }

        if (isCorrect) {
            solutionP1 += +update[Math.floor(update.length / 2)]
        } else {
            // TODO part 2 stuff
        }
    }
}

console.log('Day 5 part 1', solutionP1)
console.log('Day 5 part 2', solutionP2)