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

function Rope() {
  const H = [start()]
  const T = [start()]
  const distance = (p1, p2) =>
    Math.max(Math.abs(p2[0] - p1[0]), Math.abs(p2[1] - p1[1]))
  const add = pos => {
    distance(pos, T[0]) > 1 && T.unshift(H[0])
    H.unshift(pos)
  }
  return { contains, add, H, T }
}

function move(filePath) {
  const fileContent = readFileLines(filePath)
  let pos = start()
  const visited = new Rope()
  fileContent
    .map(row => row.split(' '))
    .forEach(([d, n]) =>
      [...new Array(Number(n))].forEach(_ => {
        pos = dir[d](pos)
        visited.add(pos)
      })
    )
  return distinct(visited.T).length
}

console.log(move('dec_09/sample-input.txt'))
console.log(move('dec_09/input.txt'))
