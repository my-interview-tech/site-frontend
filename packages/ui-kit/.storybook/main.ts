import type { StorybookConfig } from '@storybook/react-vite'

const config = {
  stories: ['../src/**/*.story.tsx'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', 'storybook/viewport'],
  framework: '@storybook/react-vite',
  staticDirs: [
    { from: '../../static/src/fonts', to: '/src/fonts' },
    { from: '../../static/src/icons', to: '/src/icons' },
    { from: '../../static/src/images', to: '/src/images' },
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
} satisfies StorybookConfig

export default config
