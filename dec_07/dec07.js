import { readFile } from '../utils/fileIO.js'

function sumOfSmallDirs(filePath) {
  const rows = readFile(filePath).split('\n')
  const dirSizes = calculateDirSizes(rows)
  const sumOfSmallDirs = sumOfDirSizesBelow(dirSizes, 100_000)
  return sumOfSmallDirs
}

function smallestDirToDelete(filePath, capacity, needed) {
  const rows = readFile(filePath).split('\n')
  const dirSizes = calculateDirSizes(rows)
  const currentFree = capacity - dirSizes['/']
  const required = needed - currentFree
  const dirToDelete = findDirToDelete(dirSizes, required)
  return dirSizes[dirToDelete]
}

function findDirToDelete(dirSizes, required) {
  return Object.entries(dirSizes)
    .sort((ds1, ds2) => ds1[1] - ds2[1])
    .find(([_, size]) => size >= required)[0]
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

// 1st part
console.log(sumOfSmallDirs('dec_07/sample-input.txt'))
console.log(sumOfSmallDirs('dec_07/input.txt'))

// 2nd part
console.log(smallestDirToDelete('dec_07/sample-input.txt', 70_000_000, 30_000_000))
console.log(smallestDirToDelete('dec_07/input.txt', 70_000_000, 30_000_000))