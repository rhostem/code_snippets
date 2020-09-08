const path = require('path')

module.exports = {
  stories: [
    '../src/stories/**/*.stories.js',
    '../src/stories/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-links/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource',
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, '../tsconfig.json'),
        },
        include: [path.resolve(__dirname)],
      },
    },
  ],
}
