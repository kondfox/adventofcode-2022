import { readFileLines } from '../utils/fileIO.js'

const common = cpu => {
  cpu.i % 40 == 20 && (cpu.strength += cpu.i * cpu.x)
  cpu.tasks[cpu.i] && cpu.tasks[cpu.i]()
}

const ops = {
  noop: cpu => {
    common(cpu)
    cpu.i += 1
  },
  addx: (cpu, v) => {
    common(cpu)
    cpu.tasks[cpu.i + 1] = () => (cpu.x += Number(v))
    cpu.i += 1
    common(cpu)
    cpu.i += 1
  },
}

function signalStrengthSum(filePath) {
  const lines = readFileLines(filePath)
  const cpu = { x: 1, i: 1, strength: 0, tasks: {} }
  for (let row of lines) {
    const [op, v] = row.split(' ')
    ops[op](cpu, v)
  }
  return cpu.strength
}

console.log(signalStrengthSum('dec_10/sample-input1.txt'))
console.log(signalStrengthSum('dec_10/sample-input2.txt'))
console.log(signalStrengthSum('dec_10/input.txt'))
