import { readFileLines } from '../utils/fileIO.js'

const common = (cpu, crt) => {
  cpu.i % 40 == 20 && (cpu.strength += cpu.i * cpu.x)
  crt.row += crt.sprite.includes(cpu.i % 40) ? '#' : '.'
  if (crt.row.length == 40) {
    console.log(crt.row)
    crt.row = ''
  }
  cpu.tasks[cpu.i] && cpu.tasks[cpu.i]()
}

const sprite = n => [n, n + 1, n + 2]

const ops = {
  noop: (cpu, crt) => {
    common(cpu, crt)
    cpu.i += 1
  },
  addx: (cpu, crt, v) => {
    common(cpu, crt)
    cpu.tasks[cpu.i + 1] = () => {
      cpu.x += Number(v)
      crt.sprite = sprite(cpu.x)
    }
    cpu.i += 1
    common(cpu, crt)
    cpu.i += 1
  },
}

function signalStrengthSum(filePath) {
  const lines = readFileLines(filePath)
  const crt = { sprite: sprite(1), row: '' }
  const cpu = { x: 1, i: 1, strength: 0, tasks: {} }
  for (let row of lines) {
    const [op, v] = row.split(' ')
    ops[op](cpu, crt, v)
  }
}

console.log(signalStrengthSum('dec_10/sample-input1.txt'))
console.log(signalStrengthSum('dec_10/sample-input2.txt'))
console.log(signalStrengthSum('dec_10/input.txt'))
