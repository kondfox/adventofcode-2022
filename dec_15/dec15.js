import { readFileLines } from '../utils/fileIO.js'
import { CoordinateSet } from '../utils/datastructures.js'

function notBeaconPositionsInLine(filePath, line) {
  const detections = readFileLines(filePath)
    .map(row => row.match(/[-]*[0-9]+/g))
    .map(([x1, y1, x2, y2]) => ({
      sensor: [Number(x1), Number(y1)],
      beacon: [Number(x2), Number(y2)],
    }))
    .map(({ sensor, beacon }) => {
      const points = pointsInLine(sensor, beacon, line)
      return points
    })
    .reduce((points, set) => {
      points.union(set)
      return points
    })
  return detections.size()
}

function pointsInLine([sx, sy], [bx, by], l) {
  let dist = Math.abs(sx - bx) + Math.abs(sy - by)
  if ([sy - dist, sy + dist, l].sort((m, n) => m - n)[1] !== l) {
    return new CoordinateSet()
  }
  const points = new CoordinateSet()
  for (let x = -(dist - Math.abs(l - sy)); x <= dist - Math.abs(l - sy); x++) {
    if (!(sx + x === bx && l === by)) points.add([sx + x, l])
  }
  return points
}

console.log(notBeaconPositionsInLine('dec_15/sample-input.txt', 10))
console.log(notBeaconPositionsInLine('dec_15/input.txt', 2_000_000))
