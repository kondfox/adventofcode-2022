import { readFile } from '../utils/fileIO.js'

function sumOfSmallDirs(filePath) {
  const rows = readFile(filePath).split('\n')
  const dirSizes = calculateDirSizes(rows)
  const sumOfSmallDirs = sumOfDirSizesBelow(dirSizes, 100_000)
  return sumOfSmallDirs
}

function calculateDirSizes(rows) {
  const dirStack = []
  const dirSizes = {}
  for (let row of rows) {
    const params = row.split(' ')
    if (params[0] === '$') {
      executeCommand(params, dirSizes, dirStack)
    } else {
      registerSize(params, dirSizes, dirStack)
    }
  }
  addRemainingDirSizes(dirSizes, dirStack)
  return dirSizes
}

function sumOfDirSizesBelow(dirSizes, limit) {
  return Object.values(dirSizes)
    .filter(s => s <= limit)
    .reduce((sum, s) => sum + s, 0)
}

function executeCommand([_, command, arg], dirSizes, dirStack) {
    if (command !== 'cd') return
    if (arg === '..') {
      const dir = dirStack.shift()
      dirSizes[dirStack[0]] += dirSizes[dir]
    } else {
      const dirName = dirStack.length ? `/${arg}${dirStack[0]}` : arg
      dirStack.unshift(dirName)
    }
}

function registerSize([size, name], dirSizes, dirStack) {
    size = Number.parseInt(size) || 0
    dirSizes[dirStack[0]] = dirSizes[dirStack[0]] + size || size
}

function addRemainingDirSizes(dirSizes, dirStack) {
  while (dirStack.length > 1) {
    const dir = dirStack.shift()
    dirSizes[dirStack[0]] += dirSizes[dir]
  }
}

console.log(sumOfSmallDirs('dec_07/sample-input.txt'))
console.log(sumOfSmallDirs('dec_07/input.txt'))