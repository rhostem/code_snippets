module.exports = {
  parser: 'babel',
  printWidth: 80,
  useTabs: false,
  tabWidth: 2,
  bracketSpacing: true,
  singleQuote: true,
  semi: false,
  trailingComma: 'es5',
  jsxBracketSameLine: true,
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html',
      },
    },
    {
      files: '*.vue',
      options: {
        parser: 'vue',
      },
    },
  ],
}
