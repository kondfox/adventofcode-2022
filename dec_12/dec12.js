import { readFileLines } from '../utils/fileIO.js'

const ascii = s => s.charCodeAt(0)

const climable = (s1, s2) => ascii(s1) - ascii(s2) <= 1

const eq = (c1, c2) => c1[0] === c2[0] && c1[1] === c2[1]

const createMap = m => {
  const find = t => {
    const coords = []
    m.forEach((row, y) =>
      row.forEach((col, x) => col === t && coords.push([y, x]))
    )
    return coords
  }

  const neighbours = ([y, x]) => {
    const n = []
    if (y > 0 && climable(m[y - 1][x], m[y][x])) n.push([y - 1, x])
    if (y < m.length - 1 && climable(m[y + 1][x], m[y][x])) n.push([y + 1, x])
    if (x > 0 && climable(m[y][x - 1], m[y][x])) n.push([y, x - 1])
    if (x < m[0].length - 1 && climable(m[y][x + 1], m[y][x]))
      n.push([y, x + 1])
    return n
  }

  const s = find('S')[0]
  const e = find('E')[0]
  m[s[0]][s[1]] = 'a'
  m[e[0]][e[1]] = 'z'

  return { h: m.length, w: m[0].length, neighbours, find, s, e }
}

function parseMap(filePath) {
  const content = readFileLines(filePath).map(r => r.split(''))
  const map = createMap(content)
  return map.find('a').reduce((shortest, from) => {
    const steps = bfs(map, from)[map.e[0]][map.e[1]].steps
    return steps < shortest ? steps : shortest
  }, Number.MAX_VALUE)
}

const visit = (from, to, steps) => ({ from, to, steps })

function bfs(map, from) {
  const visits = new Array(map.h)
    .fill(0)
    .map((_, y) =>
      new Array(map.w)
        .fill(0)
        .map((_, x) => visit(null, [y, x], Number.MAX_VALUE))
    )
  const start = visits[from[0]][from[1]]
  start.steps = 0
  const toVisit = [start]
  while (toVisit.length) {
    const actual = toVisit.shift()
    if (eq(actual.to, map.e)) break
    const neighbours = map.neighbours(actual.to)
    neighbours.forEach(n => {
      const neighbour = visits[n[0]][n[1]]
      if (actual.steps + 1 < neighbour.steps) {
        neighbour.steps = actual.steps + 1
        neighbour.from = actual.to
        toVisit.push(neighbour)
      }
    })
  }
  return visits
}

console.log(parseMap('dec_12/sample-input.txt'))
console.log(parseMap('dec_12/input.txt'))
