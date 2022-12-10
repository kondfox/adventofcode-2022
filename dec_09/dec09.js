import { readFileLines } from '../utils/fileIO.js'

const dir = {
  U: ([y, x]) => [y + 1, x],
  D: ([y, x]) => [y - 1, x],
  L: ([y, x]) => [y, x - 1],
  R: ([y, x]) => [y, x + 1],
}

const start = () => [0, 0]

const equals = (p1, p2) => p1[0] === p2[0] && p1[1] === p2[1]

const contains = (arr, pos) => arr.some(p => equals(pos, p))

const distinct = arr =>
  arr.reduce((u, p) => (contains(u, p) ? u : [...u, p]), [])

const touching = (p1, p2) =>
  Math.max(Math.abs(p2[0] - p1[0]), Math.abs(p2[1] - p1[1])) <= 1

const direction = (p1, p2) => {
  let d = ''
  if (p2[0] > p1[0]) d += 'U'
  if (p2[0] < p1[0]) d += 'D'
  if (p2[1] > p1[1]) d += 'R'
  if (p2[1] < p1[1]) d += 'L'
  return d
}

const distance = (p1, p2) => ({
  v: Math.abs(p2[0] - p1[0]),
  h: Math.abs(p2[1] - p1[1]),
  d: direction(p1, p2),
})

function Rope(length) {
  let knots = new Array(length).fill(0).map(_ => start())
  const log = [start()]

  const move = (pos, d) => {
    knots[0] = pos
    for (let i = 1; i < knots.length; i++) {
      if (touching(knots[i], knots[i - 1])) continue
      const dist = distance(knots[i], knots[i - 1])
      dist.d.split('').forEach(d => (knots[i] = dir[d](knots[i])))
      if (i == knots.length - 1) log.push(knots[knots.length - 1])
    }
  }

  return { knots, move, log }
}

function move(filePath, length) {
  const fileContent = readFileLines(filePath)
  let pos = start()
  const rope = new Rope(length)
  fileContent
    .map(row => row.split(' '))
    .forEach(([d, n]) =>
      [...new Array(Number(n))].forEach(_ => {
        pos = dir[d](pos)
        rope.move(pos, d)
      })
    )
  return distinct([...rope.knots.slice(-1), ...rope.log]).length
}

console.log(move('dec_09/sample-input.txt', 2))
console.log(move('dec_09/input.txt', 2))

console.log(move('dec_09/sample-input.txt', 10))
console.log(move('dec_09/input.txt', 10))
