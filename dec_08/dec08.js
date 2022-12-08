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

function visibleFrom(row, col, trees) {
  let from = ''
  if (row === 0) from += 'N'
  if (row === trees.length - 1) from += 'S'
  if (col === 0) from += 'W'
  if (col === trees[0].length - 1) from += 'E'
  return from
}

function findVisibles(filePath) {
  const trees = readFileLines(filePath).map(line =>
    line.split('').map(tree => Number(tree))
  )
  const visibles = calculateVisibles(trees)
  return visibles.reduce((total, r) => total + r.filter(c => !!c).length, 0)
}

function findHighestScenicScore(filePath) {
  const trees = readFileLines(filePath).map(line =>
    line.split('').map(tree => Number(tree))
  )
  const scores = calculateScores(trees)
  return findHighestScore(scores)
}

function initVisibles(trees) {
  return new Array(trees.length)
    .fill('')
    .map((_, r) =>
      new Array(trees[0].length)
        .fill(false)
        .map((_, c) => visibleFrom(r, c, trees))
    )
}

function initScores(trees) {
  return new Array(trees.length)
    .fill(1)
    .map((_, r) => new Array(trees[0].length).fill(1))
}

function initLastIndex() {
  return new Array(10)
    .fill(0)
    .map((_, i) => i)
    .reduce((obj, i) => ({ ...obj, [i]: 0 }), {})
}

function calcScore(trees, y, x, [r, c]) {
  let score = 0
  let i = 1
  while (trees[y + i * r] && trees[y + i * r][x + i * c] != undefined) {
    score++
    if (trees[y + i * r][x + i * c] >= trees[y][x]) break
    i++
  }
  return score
}

function calculateVisibles(trees) {
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
  return visibles
}

function calculateScores(trees) {
  const scores = initScores(trees)
  const edge = edgeCoordinates(trees)
  for (let [row, col] of edge) {
    scores[row][col] = 0
    const from = visibleFrom(row, col, trees)
    const dirs = from.split('').map(d => [d, dir[opposite[d]]])
    for (let [d, [r, c]] of dirs) {
      const lastIndex = initLastIndex()
      let i = 0
      while (
        trees[row + i * r] &&
        trees[row + i * r][col + i * c] != undefined
      ) {
        const y = row + i * r
        const x = col + i * c
        lastIndex[trees[y][x]] = i
        if (trees[y - r] && trees[x - c] != undefined) {
          const score = calcScore(trees, y, x, dir[d])
          scores[y][x] *= score
        }
        i++
      }
    }
  }
  return scores
}

function edgeCoordinates(trees) {
  const edge = []
  for (let row = 1; row < trees.length - 1; row++) {
    edge.push([row, 0], [row, trees[0].length - 1])
  }
  for (let col = 0; col < trees[0].length; col++) {
    edge.push([0, col], [trees.length - 1, col])
  }
  return edge
}

function findHighestScore(scores) {
  let highest = 0
  for (let row = 0; row < scores.length; row++) {
    for (let col = 0; col < scores[0].length; col++) {
      if (scores[row][col] > highest) highest = scores[row][col]
    }
  }
  return highest
}

console.log(findVisibles('dec_08/sample-input.txt'))
console.log(findVisibles('dec_08/input.txt'))

console.log(findHighestScenicScore('dec_08/sample-input.txt'))
console.log(findHighestScenicScore('dec_08/input.txt'))
