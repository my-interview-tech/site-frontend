const fs = require('fs')
const path = require('path')

const TS_CONFIG = require('./tsconfig.eslint.json')

const PACKAGE_DIRS = [
  __dirname,
  ...fs
    .readdirSync(path.join(__dirname, 'apps'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(__dirname, 'apps', entry.name)),
]

const FS_LAYERS = ['application', 'pages', 'views', 'widgets', 'features', 'entities', 'shared']
const FS_SEGMENTS = ['ui', 'model', 'lib', 'api', 'config']
const FS_LAYER_GLOB = FS_LAYERS.join(',')

const APP_PUBLIC_API = ['infra', 'feature-public-api', 'auth-public-api', 'common-public-api']
const PKG_PUBLIC_API = ['infra', 'auth-public-api', 'common-public-api']
const PKG_LAYER_TYPES = FS_LAYERS.map((layer) => `pkg-${layer}`)
const PKG_FSD_ROOTS = ['packages/feature-*/src', 'packages/auth/src', 'packages/common/src']

const layerType = (prefix, layer) => `${prefix}-${layer}`

const getLowerLayers = (layer) => FS_LAYERS.slice(FS_LAYERS.indexOf(layer) + 1)
const getUpperLayers = (layer) => FS_LAYERS.slice(0, FS_LAYERS.indexOf(layer))

const getLowerLayerTypes = (prefix, layer) =>
  getLowerLayers(layer).map((lowerLayer) => layerType(prefix, lowerLayer))

const FS_SLICED_LAYERS_REG = getUpperLayers('shared').join('|')
const FS_SEGMENTS_REG = [...FS_SEGMENTS, ...FS_SEGMENTS.map((seg) => `${seg}.*`)].join('|')

const buildBoundaryElements = () => {
  const elements = []

  for (const layer of FS_LAYERS) {
    elements.push({
      type: layerType('app', layer),
      pattern: `apps/*/src/${layer}/**`,
      mode: 'folder',
    })
  }

  for (const root of PKG_FSD_ROOTS) {
    for (const layer of FS_LAYERS) {
      elements.push({
        type: layerType('pkg', layer),
        pattern: `${root}/${layer}/**`,
        mode: 'folder',
      })
    }
  }

  elements.push({ type: 'infra', pattern: 'packages/ui-kit/**', mode: 'file' })
  elements.push({
    type: 'feature-public-api',
    pattern: 'packages/feature-*/src/index.ts',
    mode: 'file',
  })
  elements.push({ type: 'auth-public-api', pattern: 'packages/auth/src/index.ts', mode: 'file' })
  elements.push({
    type: 'common-public-api',
    pattern: 'packages/common/src/index.ts',
    mode: 'file',
  })

  return elements
}

const buildLayerBoundaryRules = (prefix, publicApis) =>
  FS_LAYERS.map((layer) => {
    const type = layerType(prefix, layer)
    const allow =
      layer === 'shared'
        ? [layerType(prefix, 'shared'), ...publicApis]
        : [...getLowerLayerTypes(prefix, layer), layerType(prefix, 'shared'), ...publicApis]

    return { from: type, allow }
  })

const buildPublicApiBoundaryRules = () => [
  {
    from: 'feature-public-api',
    allow: [...PKG_LAYER_TYPES, 'infra', 'auth-public-api', 'common-public-api'],
  },
  {
    from: 'auth-public-api',
    allow: [...PKG_LAYER_TYPES, 'infra', 'common-public-api'],
  },
  {
    from: 'common-public-api',
    allow: [...PKG_LAYER_TYPES, 'infra', 'auth-public-api'],
  },
  {
    from: 'infra',
    allow: ['infra'],
  },
]

const getFsdRules = (notificationLevel = 'error') => ({
  'import/no-cycle': notificationLevel,
  'import/no-internal-modules': [
    notificationLevel,
    {
      allow: [
        `@(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})`,
        `@(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,
        `@shared/*(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,
        `@shared/*(${FS_SEGMENTS_REG})`,
        '**/node_modules/**',
        './**',
        '@open-api/**/*',
        '@my-interview/feature-*',
        '@my-interview/auth',
        '@my-interview/common',
        '@my-interview/ui-kit',
      ],
    },
  ],
  'boundaries/element-types': [
    notificationLevel,
    {
      default: 'disallow',
      message:
        '"${file.type}" is not allowed to import "${dependency.type}" | See rules: https://feature-sliced.design/docs/reference/layers/overview ',
      rules: [
        ...buildLayerBoundaryRules('app', APP_PUBLIC_API),
        ...buildLayerBoundaryRules('pkg', PKG_PUBLIC_API),
        ...buildPublicApiBoundaryRules(),
      ],
    },
  ],
})

const FSD_LAYER_FILES = [
  `apps/*/src/{${FS_LAYER_GLOB}}/**/*.{ts,tsx}`,
  `packages/feature-*/src/{${FS_LAYER_GLOB}}/**/*.{ts,tsx}`,
  `packages/auth/src/{${FS_LAYER_GLOB}}/**/*.{ts,tsx}`,
  `packages/common/src/{${FS_LAYER_GLOB}}/**/*.{ts,tsx}`,
]

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.eslint.json',
      },
    },
    'boundaries/elements': buildBoundaryElements(),
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'plugin:boundaries/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: [
    '@typescript-eslint',
    '@feature-sliced/eslint-plugin-messages',
    'import',
    'boundaries',
    'react-hooks',
    'jsdoc',
    'prefer-arrow',
    'prettier',
  ],
  processor: '@feature-sliced/messages/fs',
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/static-property-placement': 'off',
    'react/destructuring-assignment': ['error', 'always', { ignoreClassFields: true }],
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': [
      'warn',
      {
        packageDir: PACKAGE_DIRS,
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: true,
      },
    ],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@my-interview/**',
            group: 'external',
            position: 'after',
          },
          ...Object.keys(TS_CONFIG.compilerOptions?.paths || {})
            .map((layer) => {
              const layerWithoutAtSign = layer.replace('@', '')

              if (layer.indexOf('root') !== -1) {
                return []
              }

              return [
                {
                  pattern: `**/?(@)${layerWithoutAtSign}`,
                  group: 'internal',
                  position: 'after',
                },
                {
                  pattern: `**/?(@)${layerWithoutAtSign}*/*`,
                  group: 'internal',
                  position: 'after',
                },
              ]
            })
            .flat(),
          ...Array.from({ length: 5 }).map((_, i, arr) => ({
            pattern: `${'../'.repeat(arr.length - i)}*`,
            group: 'parent',
            position: 'after',
          })),
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'object'],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],
    'no-plusplus': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'no-param-reassign': 'off',
    'newline-after-var': ['error', 'always'],
    'newline-before-return': 'error',
    'no-unreachable': 'error',
    curly: 'error',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/no-array-index-key': 'off',
    'no-void': 'off',
    'no-bitwise': 'off',
    'react/jsx-sort-props': ['error', { shorthandFirst: true, noSortAlphabetically: true }],
    'react/jsx-props-no-spreading': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'never',
        enums: 'always-multiline',
      },
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    '@typescript-eslint/no-unsafe-argument': 'error',
    ...getFsdRules(),
    'no-restricted-imports': [
      'error',
      {
        paths: [],
        patterns: [
          {
            group: ['@my-interview/feature-*/src/*', '@my-interview/feature-*/src/**'],
            message: 'Import feature modules only via public API: @my-interview/feature-*',
          },
          {
            group: ['@my-interview/auth/src/*', '@my-interview/auth/src/**'],
            message: 'Import auth modules only via public API: @my-interview/auth',
          },
          {
            group: ['@my-interview/common/src/*', '@my-interview/common/src/**'],
            message: 'Import common modules only via public API: @my-interview/common',
          },
          {
            group: ['@my-interview/ui-kit/src/*', '@my-interview/ui-kit/src/**'],
            message: 'Import ui-kit modules only via public API: @my-interview/ui-kit',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: FSD_LAYER_FILES,
      rules: getFsdRules('error'),
    },
    // UI Kit: не применяются правила FSD, так как это отдельный пакет
    {
      files: ['packages/ui-kit/**/*.{ts,tsx}'],
      rules: {
        'boundaries/element-types': 'off',
        'import/no-internal-modules': 'off',
        'import/no-cycle': 'off',
      },
    },
    {
      files: ['apps/*/src/{main,index}.tsx'],
      rules: {
        'boundaries/element-types': 'off',
        'import/no-internal-modules': 'off',
        'import/no-cycle': 'off',
      },
    },
    {
      files: ['packages/**/src/index.ts'],
      rules: {
        'import/no-internal-modules': 'off',
      },
    },
    // Public API slice (index.ts внутри слоёв): отдает содержимое пакета для внешнего использования
    // Правила FSD не применяются к этим файлам
    {
      files: [
        'apps/*/src/**/index.ts',
        'packages/feature-*/src/**/index.ts',
        'packages/auth/src/**/index.ts',
        'packages/common/src/**/index.ts',
      ],
      rules: {
        'import/no-internal-modules': 'off',
      },
    },
    {
      files: ['packages/**/*.{ts,tsx}'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['vite.shared.ts', 'vitest.setup.ts', 'apps/*/vite.config.ts'],
      parserOptions: {
        project: null,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['.eslintrc.cjs', 'lint-staged.config.cjs'],
      parserOptions: {
        project: null,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
