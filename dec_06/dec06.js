const hasDuplicate = arr => new Set(arr).size != arr.length

const findPos = (s, length) => {
  let window = []
  for (let i = 0; i < s.length; i++) {
    window = [...window, s[i]].slice(-length)
    if (window.length === length && !hasDuplicate(window)) return i + 1
  }
}

console.log(findPos('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 4))
console.log(findPos('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14))