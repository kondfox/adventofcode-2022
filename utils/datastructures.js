export function Intervals(initData) {
  const intervals = []

  const overlapping = (i1, i2) =>
    (i1[0] <= i2[0] && i1[1] >= i2[0]) || (i2[0] <= i1[0] && i2[1] >= i1[0])

  const add = int => {
    if (!intervals.length || !intervals.some(i => overlapping(i, int))) {
      intervals.push(int)
    } else {
      const newInterval = [...int]
      for (let i = 0; i < intervals.length; i++) {
        if (overlapping(intervals[i], newInterval)) {
          newInterval[0] = Math.min(newInterval[0], intervals[i][0])
          newInterval[1] = Math.max(newInterval[1], intervals[i][1])
          intervals.splice(i--, 1)
        }
      }
      intervals.push(newInterval)
    }
  }

  const merge = otherIntervals => otherIntervals.intervals.forEach(i => add(i))

  const inOrder = () => intervals.sort((i1, i2) => i1[0] - i2[0])

  const size = () => intervals.length

  const longest = () =>
    intervals.reduce((l, i) => (i[1] - i[0] > l ? i[1] - i[0] : l), 0)

  initData && add(initData)

  return { intervals, add, merge, inOrder, size, longest }
}

export function CoordinateSet(initData) {
  const idSet = new Set()
  const w = 1_000_000
  const id = ([x, y]) => `[${x},${y}]`

  const add = c => idSet.add(id(c))

  const has = c => idSet.has(id(c))

  const union = set => set?.idSet?.forEach(id => idSet.add(id))

  const values = () =>
    [...idSet]
      .map(id => id.match(/[-]*[0-9]+/g))
      .map(([x, y]) => [Number(x), Number(y)])
      .sort((a, b) => a[0] - b[0])

  const size = () => idSet.size

  initData && initData.forEach(e => add(e))

  return {
    values,
    add,
    has,
    union,
    idSet,
    size,
    [Symbol.iterator]() {
      return {
        current: 0,
        last: elements.length - 1,
        elements: values(),
        next() {
          if (this.current <= this.last) {
            return { done: false, value: this.elements[this.current++] }
          } else {
            return { done: true }
          }
        },
      }
    },
  }
}
