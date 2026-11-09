const fs = require('node:fs')
const path = require('node:path')

const iconsDir = path.resolve(__dirname, '../src/icons')
const outputFile = path.join(iconsDir, 'structure.json')
const isCheck = process.argv.includes('--check')

const icons = fs
  .readdirSync(iconsDir)
  .filter((file) => file.endsWith('.svg'))
  .map((file) => file.slice(0, -'.svg'.length))
  .sort()

const content = `${JSON.stringify({ icons }, null, 2)}\n`

if (!isCheck) {
  fs.writeFileSync(outputFile, content)
  process.exit(0)
}

const current = fs.existsSync(outputFile) ? fs.readFileSync(outputFile, 'utf8') : ''

if (current !== content) {
  console.error('icons/structure.json устарел: yarn workspace @my-interview/static icons:structure')
  process.exit(1)
}
