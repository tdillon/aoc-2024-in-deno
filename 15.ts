const input = (await Deno.readTextFile('input/15.txt'))
    .split('\n')

const map = input.filter(r => r.startsWith('#')).map(r => r.split(''))
const moves = input.filter(r =>
    r.startsWith('^') ||
    r.startsWith('<') ||
    r.startsWith('>') ||
    r.startsWith('v')).flatMap(r => r.split('') as Array<'v' | '^' | '<' | '>'>)

const numRows = map.length
const numCols = map[0].length
const cur = { r: -1, c: -1 }
let solution = 0

for (let r = 0; cur.r < 0; ++r) {
    for (let c = 0; cur.r < 0 && c < numCols; ++c) {
        if (map[r][c] === '@') {
            cur.r = r
            cur.c = c
        }
    }
}

function canMove(pos: { r: number, c: number }, m: '^' | 'v' | '<' | '>'): boolean {
    if (map[pos.r][pos.c] === '#') {
        return false
    } else if (map[pos.r][pos.c] === '.') {
        return true
    } else if (m === '^') {
        return canMove({ ...pos, r: pos.r - 1 }, m)
    } else if (m === 'v') {
        return canMove({ ...pos, r: pos.r + 1 }, m)
    } else if (m === '<') {
        return canMove({ ...pos, c: pos.c - 1 }, m)
    } else if (m === '>') {
        return canMove({ ...pos, c: pos.c + 1 }, m)
    } else {
        throw new Error('how')
    }
}

function move(pos: { r: number, c: number }, m: '^' | 'v' | '<' | '>', thing: 'O' | '@') {
    let next: 'O' | '.'

    if (m === '^') {
        next = map[pos.r - 1][pos.c] as 'O' | '.'
        map[pos.r - 1][pos.c] = thing
        if (next !== '.') {
            move({ ...pos, r: pos.r - 1 }, m, next)
        }
    } else if (m === 'v') {
        next = map[pos.r + 1][pos.c] as 'O' | '.'
        map[pos.r + 1][pos.c] = thing
        if (next !== '.') {
            move({ ...pos, r: pos.r + 1 }, m, next)
        }
    } else if (m === '<') {
        next = map[pos.r][pos.c - 1] as 'O' | '.'
        map[pos.r][pos.c - 1] = thing
        if (next !== '.') {
            move({ ...pos, c: pos.c - 1 }, m, next)
        }
    } else { // m === '>'
        next = map[pos.r][pos.c + 1] as 'O' | '.'
        map[pos.r][pos.c + 1] = thing
        if (next !== '.') {
            move({ ...pos, c: pos.c + 1 }, m, next)
        }
    }
}

function makeMove(m: '^' | 'v' | '<' | '>') {
    if (canMove(cur, m)) {
        move(cur, m, '@')
        map[cur.r][cur.c] = '.'
        if (m === '^') {
            --cur.r
        } else if (m === 'v') {
            ++cur.r
        } else if (m === '<') {
            --cur.c
        } else { // m === '>'
            ++cur.c
        }
    }
}

for (const m of moves) {
    makeMove(m)
}

for (let r = 0; r < numRows; ++r) {
    console.log(map[r].join(''))
    for (let c = 0; c < numCols; ++c) {
        if (map[r][c] === 'O') {
            solution += ((r * 100) + c)
        }
    }
}

console.log('Day 15 part 1', solution)
