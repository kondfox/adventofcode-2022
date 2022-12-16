import { readFileLines } from '../utils/fileIO.js'
import { Intervals } from '../utils/datastructures.js'

function part1(filePath, line) {
  return notBeaconPositionsInLine(parseDevices(filePath), line).longest()
}

function part2(filePath, limit) {
  const [x, y] = findBeaconPosition(parseDevices(filePath), limit)
  return x * 4_000_000 + y
}

function findBeaconPosition(devices, limit) {
  for (let i = 0; i <= limit; i++) {
    const intervals = notBeaconPositionsInLine(devices, i)
    if (intervals.size() < 2) continue
    const [[x1, x2], [x3, x4]] = intervals.inOrder()
    return [x2 + 1, i]
  }
}

function notBeaconPositionsInLine(devices, line) {
  return devices
    .map(({ sensor, beacon }) => pointsInLine(sensor, beacon, line))
    .reduce((merged, intervals) => {
      merged.merge(intervals)
      return merged
    })
}

function parseDevices(filePath) {
  return readFileLines(filePath)
    .map(row => row.match(/[-]*[0-9]+/g))
    .map(([x1, y1, x2, y2]) => ({
      sensor: [Number(x1), Number(y1)],
      beacon: [Number(x2), Number(y2)],
    }))
}

function pointsInLine([sx, sy], [bx, by], l) {
  let dist = Math.abs(sx - bx) + Math.abs(sy - by)
  if ([sy - dist, sy + dist, l].sort((m, n) => m - n)[1] !== l) {
    return new Intervals()
  }
  return new Intervals([
    sx - (dist - Math.abs(l - sy)),
    sx + dist - Math.abs(l - sy),
  ])
}

// console.log(part1('dec_15/sample-input.txt', 10))
// console.log(part1('dec_15/input.txt', 2_000_000))

// console.log(part2('dec_15/sample-input.txt', 20))
console.log(part2('dec_15/input.txt', 4_000_000))
