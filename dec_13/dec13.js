import { readFileLines } from '../utils/fileIO.js'

const asArray = n => (Array.isArray(n) ? n : [n])

function sumOfInOrderPairIndices(filePath) {
  const input = parseInput(filePath)
  let inOrder = 0
  for (let i = 0, j = 1; i < input.length; i += 2, j++) {
    const [arr1, arr2] = [input[i], input[i + 1]]
    if (compareArrays(arr1, arr2)) inOrder += j
  }
  return inOrder
}

function findDecoderKey(filePath) {
  const sorted = sort(filePath)
  let [key2, key6] = [0, 0]
  for (let i = 0; i < sorted.length; i++) {
    if (key2 > 0 && key6 > 0) break
    if (sorted[i].length == 1 && sorted[i][0].length == 1) {
      if (sorted[i][0][0] === 2) key2 = i + 1
      else if (sorted[i][0][0] === 6) key6 = i + 1
    }
  }
  return key2 * key6
}

function sort(filePath) {
  const input = parseInput(filePath)
  input.push([[2]], [[6]])
  input.sort(arrayComparator)
  return input
}

function parseInput(filePath) {
  return readFileLines(filePath)
    .map(row => {
      const stack = []
      for (let i = 0; i < row.length; i++) {
        let c = row[i]
        if (c === ',') continue
        if (c === '[') stack.unshift([])
        else if (c === ']') {
          if (stack.length > 1) {
            const embedded = stack.shift()
            stack[0].push(embedded)
          }
        } else {
          if (row[i + 1] && row[i + 1] !== ',' && row[i + 1] !== ']') {
            c += row[++i]
          }
          stack[0].push(Number(c))
        }
      }
      return stack[0]
    })
    .filter(arr => arr !== undefined)
}

function arrayComparator(arr1, arr2) {
  const comp = compareArrays(arr1, arr2)
  if (comp === undefined) return 0
  return comp ? -1 : 1
}

function compareArrays(arr1, arr2) {
  for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
    if (arr1[i] === undefined && arr2[i] != undefined) return true
    if (arr1[i] != undefined && arr2[i] === undefined) return false
    let [e1, e2] = [arr1[i], arr2[i]]
    if (!Array.isArray(e1) && !Array.isArray(e2)) {
      if (e1 === e2) continue
      return e1 < e2
    }
    const isSubOrder = compareArrays(asArray(e1), asArray(e2))
    if (isSubOrder !== undefined) return isSubOrder
  }
  return undefined
}

console.log(sumOfInOrderPairIndices('dec_13/sample-input.txt'))
console.log(sumOfInOrderPairIndices('dec_13/input.txt'))

console.log(findDecoderKey('dec_13/sample-input.txt'))
console.log(findDecoderKey('dec_13/input.txt'))
