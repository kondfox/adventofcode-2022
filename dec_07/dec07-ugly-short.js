import { readFileLines } from '../utils/fileIO.js'

const dirStack = []
const dirSizes = {}

const operations = {
  cdIn: dirName => dirStack.unshift(`/${dirName}${dirStack[0] || ''}`),
  cdOut: () => (dirSizes[dirStack[1]] += dirSizes[dirStack.shift()]),
  addSize: size =>
    (dirSizes[dirStack[0]] = dirSizes[dirStack[0]] + size || size),
}

const parse = ([p1, p2, p3]) => {
  if (p3 === '..') operations.cdOut()
  else if (p2 === 'cd') operations.cdIn(p3)
  else if (!!Number.parseInt(p1)) operations.addSize(Number.parseInt(p1))
}

const calculateDirSizes = filePath => {
  readFileLines(filePath)
    .map(line => line.split(' '))
    .forEach(parse)
  while (dirStack.length > 1) operations.cdOut()
}

const q1 = m =>
  Object.values(dirSizes)
    .filter(s => s <= m)
    .reduce((sum, s) => sum + s, 0)

const q2 = (total, need) =>
  Object.entries(dirSizes)
    .sort((ds1, ds2) => ds1[1] - ds2[1])
    .find(([_, size]) => size >= need - (total - dirSizes['//']))[1]

calculateDirSizes('dec_07/sample-input.txt')

console.log(q1(100_000))
console.log(q2(70_000_000, 30_000_000))
