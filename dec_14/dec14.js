import { readFileLines } from '../utils/fileIO.js'

const source = [0, 500]

const eq = (p1, p2) => p1[0] === p2[0] && p1[1] === p2[1]
const find = (arr, p) => arr.find(e => eq(e, p))
const down = p => [p[0] + 1, p[1]]
const downLeft = p => [p[0] + 1, p[1] - 1]
const downRight = p => [p[0] + 1, p[1] + 1]

function parsePaths(filePath) {
  const paths = readFileLines(filePath).map(row =>
    row.split(' -> ').map(c => c.split(',').map(n => Number(n)))
  )
  const walls = findWalls(paths)
  const boundaries = findBoundaries(paths)
  const sand = dropSand(walls, boundaries, source)
  // draw(walls, boundaries, sand)
  return sand.length
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

function dropSand(walls, boundaries, source) {
  const sand = []
  let s = [...source]
  const obstacles = [...walls]
  while (s[0] < boundaries.S && !isRest(s, obstacles)) {
    if (!find(obstacles, down(s))) s = down(s)
    else if (!find(obstacles, downLeft(s))) s = downLeft(s)
    else s = downRight(s)
    if (isRest(s, obstacles)) {
      sand.push(s)
      obstacles.push(s)
      s = [...source]
    }
  }
  return sand
}

function isRest(p, obs) {
  return find(obs, down(p)) && find(obs, downLeft(p)) && find(obs, downRight(p))
}

function draw(walls, b, sand) {
  for (let y = 0; y <= b.S; y++) {
    let row = ''
    for (let x = 0; x <= b.w; x++) {
      if (find(walls, [y, x + b.W])) {
        row += '#'
      } else if (find(sand, [y, x + b.W])) {
        row += 'o'
      } else {
        row += '.'
      }
    }
    console.log(row)
  }
}

console.log(parsePaths('dec_14/sample-input.txt'))
console.log(parsePaths('dec_14/input.txt'))
