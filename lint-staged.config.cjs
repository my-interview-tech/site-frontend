module.exports = {
  '**/*.{js,ts,tsx,jsx}': (filenames) =>
    `eslint ${filenames.map((f) => `"${f}"`).join(' ')} --fix -c .eslintrc.cjs`,
  '**/*.{ts,tsx}': [
    (filenames) => `stylelint ${filenames.map((f) => `"${f}"`).join(' ')} --fix`,
    () => 'tsc -p tsconfig.eslint.json --noEmit',
  ],
}
