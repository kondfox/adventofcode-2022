import { readFileLines } from '../utils/fileIO.js'

const dir = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  W: [0, -1],
}

const opposite = {
  N: 'S',
  E: 'W',
  S: 'N',
  W: 'E',
}

const visibleFrom = (row, col, trees) => {
  let from = ''
  if (row === 0) from += 'N'
  if (row === trees.length - 1) from += 'S'
  if (col === 0) from += 'W'
  if (col === trees[0].length - 1) from += 'E'
  return from
}

const initVisibles = trees => {
  return new Array(trees.length)
    .fill('')
    .map((_, r) =>
      new Array(trees[0].length)
        .fill(false)
        .map((_, c) => visibleFrom(r, c, trees))
    )
}

function findVisibles(filePath) {
  const trees = readFileLines(filePath).map(line =>
    line.split('').map(tree => Number(tree))
  )
  const visibles = initVisibles(trees)
  const edge = edgeCoordinates(trees)
  for (let [row, col] of edge) {
    const from = visibleFrom(row, col, trees)
    const dirs = from.split('').map(d => [d, dir[opposite[d]]])
    for (let [d, [r, c]] of dirs) {
      let i = 1
      let highestTree = trees[row][col]
      while (
        trees[row + i * r] &&
        trees[row + i * r][col + i * c] != undefined
      ) {
        const tree = trees[row + i * r][col + i * c]
        if (tree > highestTree) {
          highestTree = tree
          visibles[row + i * r][col + i * c] += d
        }
        i++
      }
    }
  }
  return visibles.reduce((total, r) => total + r.filter(c => !!c).length, 0)
}

function edgeCoordinates(trees) {
  const edge = []
  for (let row = 1; row < trees.length - 1; row++) {
    edge.push([row, 0], [row, trees[0].length - 1])
  }
  for (let col = 1; col < trees[0].length - 1; col++) {
    edge.push([0, col], [trees.length - 1, col])
  }
  return edge
}

console.log(findVisibles('dec_08/sample-input.txt'))
console.log(findVisibles('dec_08/input.txt'))
