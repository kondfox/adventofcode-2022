import { readFileLines } from '../utils/fileIO.js'

const monkey = () => items => op => cond => case1 => case2 => ({
  items,
  op,
  test: n => (n % cond == 0 ? case1 : case2),
  inspects: 0,
  cond,
})

const operation = {
  '*': v => n => n * (v || n),
  '+': v => n => n + (v || n),
}

const parseOperation = ([_, o, v]) => operation[o](Number(v))

function parseMonkeys(filePath, rounds, calmness) {
  const lines = readFileLines(filePath)
  const states = {
    skip: () => {},
    items: row =>
      row
        .split(': ')[1]
        .split(', ')
        .map(i => Number(i)),
    op: row => parseOperation(row.split(' = ')[1].split(' ')),
    testCond: row => Number(row.trim().split(' ')[3]),
    testCase1: row => Number(row.trim().split(' ')[5]),
    testCase2: row => Number(row.trim().split(' ')[5]),
  }
  const stateOrder = [...Object.values(states), states.skip]
  const monkeys = []
  for (let j = 0; j < (lines.length + 1) / stateOrder.length; j++) {
    let m = monkey()
    for (let i = 0; i < stateOrder.length; i++) {
      const result = stateOrder[i](lines[j * stateOrder.length + i])
      result != undefined && (m = m(result))
    }
    monkeys.push(m)
  }
  const condProd = monkeys.reduce((p, m) => p * m.cond, 1)
  for (let i = 0; i < rounds; i++) {
    for (let j = 0; j < monkeys.length; j++) {
      const m = monkeys[j]
      const itemCount = m.items.length
      m.inspects += itemCount
      for (let k = 0; k < itemCount; k++) {
        const item = m.items.shift()
        const worry = Math.floor(m.op(item) / calmness) % condProd
        const to = m.test(worry)
        monkeys[to].items.push(worry)
      }
    }
  }
  return monkeys
    .map(m => m.inspects)
    .sort((a, b) => a - b)
    .slice(-2)
    .reduce((p, i) => p * i, 1)
}

console.log(parseMonkeys('dec_11/sample-input.txt', 20, 3))
console.log(parseMonkeys('dec_11/input.txt', 20, 3))

console.log(parseMonkeys('dec_11/sample-input.txt', 10_000, 1))
console.log(parseMonkeys('dec_11/input.txt', 10_000, 1))
