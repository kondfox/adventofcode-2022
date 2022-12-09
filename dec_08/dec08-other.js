import { readFileLines } from '../utils/fileIO.js'

const direction = (width, all) => ({
  N: i => (i - width > 0 ? i - width : undefined),
  E: i => ((i + 1) % width != 0 ? i + 1 : undefined),
  S: i => (i + width < all ? i + width : undefined),
  W: i => (i % width != 0 ? i - 1 : undefined),
})

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

function findEdges(width, trees) {
  return trees
    .map((_, i) => i)
    .filter(
      i =>
        i < width ||
        i >= trees.length - width ||
        i % width == 0 ||
        (i + 1) % width == 0
    )
}

function findLocalMaxes(trees, tree, dir) {
  const maxes = [tree]
  while (dir(tree)) {
    tree = dir(tree)
    if (trees[tree] > trees[maxes[0]]) maxes.unshift(tree)
  }
  maxes.pop()
  return maxes
}

console.log(findVisibles('dec_08/sample-input.txt'))
console.log(findVisibles('dec_08/input.txt'))
