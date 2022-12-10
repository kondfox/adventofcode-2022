import { readFileLines } from '../utils/fileIO.js'

const ops = {
  noop: cpu => (cpu.i += 1),
  addx: (cpu, v, tasks) => {
    tasks[cpu.i + 1] = () => (cpu.x += Number(v))
    cpu.i += 2
  },
}

function signalStrengthSum(filePath) {
  const lines = readFileLines(filePath)
  const cpu = { x: 1, i: 1 }
  const tasks = {}
  for (let row of lines) {
    const [op, v] = row.split(' ')
    ops[op](cpu, v, tasks)
  }
  let signalStrength = 0
  for (let i = 1; Object.keys(tasks).length; i++) {
    if (i % 40 == 20) {
      signalStrength += i * cpu.x
    }
    if (tasks[i]) {
      tasks[i]()
      delete tasks[i]
    }
  }
  return signalStrength
}

console.log(signalStrengthSum('dec_10/sample-input1.txt'))
console.log(signalStrengthSum('dec_10/sample-input2.txt'))
console.log(signalStrengthSum('dec_10/input.txt'))
