module.exports = {
  // 📂 eslint
  '**/*.{js,ts,tsx,jsx}': (filenames) => `eslint ${filenames.map((f) => `"${f}"`).join(' ')} --fix -c .eslintrc.cjs`,
  
  // 📂 stylelint
  '**/*.{ts,tsx}': (filenames) => `stylelint ${filenames.map((f) => `"${f}"`).join(' ')} --fix`,
  
  // 📂 svgo
  'packages/static/src/{icons,images}/**/*.svg': [
    (filenames) => `svgo --config packages/static/svgo.config.js ${filenames.map((f) => `"${f}"`).join(' ')}`,
    () => 'node packages/static/scripts/buildIconsStructure.cjs --check',
  ],
}
