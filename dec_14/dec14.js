import { readFileLines } from '../utils/fileIO.js'

const source = [0, 500]

const down = p => [p[0] + 1, p[1]]
const downLeft = p => [p[0] + 1, p[1] - 1]
const downRight = p => [p[0] + 1, p[1] + 1]
const id = p => 10_000 * p[0] + p[1]

function part1(filePath) {
  const paths = readFileLines(filePath).map(row =>
    row.split(' -> ').map(c => c.split(',').map(n => Number(n)))
  )
  const walls = findWalls(paths)
  const boundaries = findBoundaries(paths)
  const sand = dropSand(walls, boundaries, source)
  // draw(walls, boundaries, sand)
  return sand.length
}

function part2(filePath) {
  const paths = readFileLines(filePath).map(row =>
    row.split(' -> ').map(c => c.split(',').map(n => Number(n)))
  )
  const boundaries = findBoundaries(paths)
  const walls = findWalls(paths)
  const sand = dropSand(walls, boundaries, source, boundaries.S + 1)
  // draw(walls, boundaries, sand)
  return sand.length + 1
}

function findWalls(paths) {
  const walls = []
  for (let path of paths) {
    const wall = [...path]
    const points = {}
    for (let i = 1; i < path.length; i++) {
      points[i] = generatePointsBetween(path[i - 1], path[i])
    }
    Object.entries(points).reduce((added, [i, p]) => {
      wall.splice(added + Number(i), 0, ...p)
      return added + p.length
    }, 0)
    walls.push(wall)
  }
  return walls.flatMap(w => w).map(([x, y]) => [y, x])
}

function generatePointsBetween(p1, p2) {
  const dim = p1[1] === p2[1] ? 0 : 1
  const from = p1[dim] <= p2[dim] ? [...p1] : [...p2]
  const to = p1[dim] > p2[dim] ? [...p1] : [...p2]
  const dist = to[dim] - from[dim] - 1
  const points = []
  for (let i = 0; i < dist; i++) {
    from[dim] += 1
    points.push([...from])
  }
  return points
}

function findBoundaries(paths) {
  const b = paths
    .flatMap(path => path)
    .reduce(
      (boundaries, [x, y]) => {
        if (y < boundaries.N) boundaries.N = y
        if (y > boundaries.S) boundaries.S = y
        if (x > boundaries.E) boundaries.E = x
        if (x < boundaries.W) boundaries.W = x
        return boundaries
      },
      {
        N: Number.MAX_VALUE,
        S: 0,
        W: Number.MAX_VALUE,
        E: -Number.MAX_VALUE,
      }
    )
  b['h'] = b.S - b.N
  b['w'] = b.E - b.W
  b['s'] = [0, 500 - b.W]
  return b
}

function dropSand(walls, boundaries, source, bottom) {
  const sand = []
  let s = [...source]
  const obstacles = new Set([...walls.map(w => id(w))])
  while (!isRest([...source], obstacles, bottom)) {
    if (!obstacles.has(id(down(s)))) s = down(s)
    else if (!obstacles.has(id(downLeft(s)))) s = downLeft(s)
    else s = downRight(s)
    if (isRest(s, obstacles, bottom)) {
      sand.push(s)
      obstacles.add(id(s))
      s = [...source]
    }
  }
  return sand
}

function isRest(p, obs, bottom) {
  return (
    p[0] === bottom ||
    (obs.has(id(down(p))) &&
      obs.has(id(downLeft(p))) &&
      obs.has(id(downRight(p))))
  )
}

function draw(walls, b, sand) {
  const wallIds = new Set(walls.map(w => id(w)))
  const sandIds = new Set(sand.map(s => id(s)))
  for (let y = 0; y <= b.S + 1; y++) {
    let row = ''
    for (let x = -10; x <= b.w + 10; x++) {
      if (wallIds.has(id([y, x + b.W]))) {
        row += '#'
      } else if (sandIds.has(id([y, x + b.W]))) {
        row += 'o'
      } else {
        row += '.'
      }
    }
    console.log(row)
  }
}

// console.log(part1('dec_14/sample-input.txt'))
// console.log(part1('dec_14/input.txt'))

console.log(part2('dec_14/sample-input.txt'))
console.log(part2('dec_14/input.txt'))
