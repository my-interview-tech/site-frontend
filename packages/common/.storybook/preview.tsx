import { useRef, type ReactNode } from 'react'
import type { Decorator, Preview } from '@storybook/react-vite'

import { LinkProvider, UiKitProvider, type LinkProps } from '@my-interview/ui-kit'

import { Styled } from './styled'

const storageKey = 'my-interview-theme'

type FrameProps = {
  children: ReactNode
  mode: 'dark' | 'light'
}

const StoryLink = ({ children, ...props }: LinkProps) => <a {...props}>{children}</a>

const ThemeFrame = ({ children, mode }: FrameProps) => {
  const applied = useRef<FrameProps['mode'] | null>(null)

  if (applied.current !== mode) {
    applied.current = mode

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, mode)
    }
  }

  return (
    <UiKitProvider key={mode}>
      <LinkProvider component={StoryLink}>
        <Styled.Frame>{children}</Styled.Frame>
      </LinkProvider>
    </UiKitProvider>
  )
}

const withTheme: Decorator = (Story, context) => {
  const mode = context.globals.theme === 'dark' ? 'dark' : 'light'

  return (
    <ThemeFrame mode={mode}>
      <Story />
    </ThemeFrame>
  )
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Тема оформления',
      defaultValue: 'light',
      toolbar: {
        title: 'Тема',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Светлая' },
          { value: 'dark', title: 'Тёмная' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  parameters: {
    backgrounds: { disable: true },
    layout: 'fullscreen',
    options: {
      storySort: { method: 'alphabetical' },
    },
    viewport: {
      options: {
        '1920': {
          name: '1920x1204',
          type: 'desktop',
          styles: { width: '1920px', height: '1204px' },
        },
        '1024': {
          name: '1024x768',
          type: 'tablet',
          styles: { width: '1024px', height: '768px' },
        },
        '768': {
          name: '768x1024',
          type: 'tablet',
          styles: { width: '768px', height: '1024px' },
        },
        '375': {
          name: '375x812',
          type: 'mobile',
          styles: { width: '375px', height: '812px' },
        },
        '320': {
          name: '320x692',
          type: 'mobile',
          styles: { width: '320px', height: '692px' },
        },
      },
    },
  },
}

export default preview
