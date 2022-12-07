import fs from 'fs'

const rootDir = new URL('..', import.meta.url).pathname

export const readFile = (filePath) => {
  return fs.readFileSync(rootDir + filePath, 'utf-8')
}