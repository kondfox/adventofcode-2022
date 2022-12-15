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
