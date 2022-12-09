import { readFileLines } from '../utils/fileIO.js'

const direction = (width, all) => ({
  N: i => (i - width > 0 ? i - width : undefined),
  E: i => ((i + 1) % width != 0 ? i + 1 : undefined),
  S: i => (i + width < all ? i + width : undefined),
  W: i => (i % width != 0 ? i - 1 : undefined),
})

const indexArray = arr => arr.map((_, i) => i)

function findVisibles(filePath) {
  const forest = readFileLines(filePath).map(line =>
    line.split('').map(tree => Number(tree))
  )
  const width = forest[0].length
  const trees = forest.flatMap(t => t)
  const dir = direction(width, trees.length)
  const edges = findEdges(width, trees)
  const localMaxes = edges.flatMap(e =>
    Object.values(dir).flatMap(d => findLocalMaxes(trees, e, d))
  )
  return new Set([...edges, ...localMaxes]).size
}

function findHighestScore(filePath) {
  const forest = readFileLines(filePath).map(line =>
    line.split('').map(tree => Number(tree))
  )
  const width = forest[0].length
  const trees = forest.flatMap(t => t)
  const dir = direction(width, trees.length)
  return indexArray(trees).reduce(
    (highest, t) =>
      Math.max(
        highest,
        Object.values(dir).reduce((score, d) => {
          const s = nextLocalMax(trees, t, d)?.steps || 0
          return score * s
        }, 1)
      ),
    0
  )
}

function findEdges(width, trees) {
  return indexArray(trees).filter(
    i =>
      i < width ||
      i >= trees.length - width ||
      i % width == 0 ||
      (i + 1) % width == 0
  )
}

function nextLocalMax(trees, tree, dir, allowEquals = true, max = tree) {
  let steps = 0
  while (dir(tree)) {
    steps++
    tree = dir(tree)
    if ((allowEquals && trees[tree] >= trees[max]) || trees[tree] > trees[max])
      return { steps, index: tree }
  }
  return { steps, index: undefined }
}

function findLocalMaxes(trees, tree, dir) {
  const maxes = [tree]
  let next = nextLocalMax(trees, tree, dir, false, maxes[0])
  while (next.index != undefined) {
    maxes.unshift(next.index)
    next = nextLocalMax(trees, tree, dir, false, maxes[0])
  }
  maxes.pop()
  return maxes
}

console.log(findVisibles('dec_08/sample-input.txt'))
console.log(findVisibles('dec_08/input.txt'))

console.log(findHighestScore('dec_08/sample-input.txt'))
console.log(findHighestScore('dec_08/input.txt'))
