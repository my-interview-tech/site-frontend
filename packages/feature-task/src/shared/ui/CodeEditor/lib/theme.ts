import type { DefaultTheme } from 'styled-components'

import { javascript } from '@codemirror/lang-javascript'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { EditorView } from '@codemirror/view'
import { tags } from '@lezer/highlight'
import { indentationMarkers } from '@replit/codemirror-indentation-markers'

const MONO = 'ui-monospace, sfmono-regular, menlo, monospace'

/**
 * Форма маркера гаттера CodeMirror. Цвет задаёт фон под маской: внутрь data-URI `var()` не подставится.
 */
const WARNING_MARKER = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path stroke="#000" stroke-width="6" stroke-linejoin="round" d="M20 6L37 35L3 35Z"/></svg>'
)}") center / contain no-repeat`

export const languageExtension = (language: string) => {
  if (language === 'react') {
    return javascript({ jsx: true, typescript: true })
  }

  if (language === 'typescript') {
    return javascript({ typescript: true })
  }

  return javascript()
}

export const highlightExtension = ({ colors }: DefaultTheme) =>
  syntaxHighlighting(
    HighlightStyle.define([
      { tag: [tags.keyword, tags.controlKeyword, tags.moduleKeyword, tags.definitionKeyword], color: colors.codeTag },
      { tag: [tags.string, tags.special(tags.string), tags.regexp], color: colors.success },
      { tag: [tags.number, tags.bool, tags.null, tags.atom], color: colors.blue },
      { tag: [tags.comment, tags.lineComment, tags.blockComment], color: colors.codeComment, fontStyle: 'italic' },
      {
        tag: [tags.function(tags.variableName), tags.function(tags.propertyName), tags.definition(tags.variableName)],
        color: colors.accentDeep,
      },
      { tag: [tags.typeName, tags.className], color: colors.blue },
      { tag: [tags.tagName, tags.angleBracket], color: colors.danger },
      { tag: tags.attributeName, color: colors.badgeTask },
      { tag: [tags.variableName, tags.propertyName], color: colors.textPrimary },
      { tag: [tags.operator, tags.punctuation, tags.bracket], color: colors.textSecondary },
    ])
  )

export const appearanceExtension = (
  { colors, mode, radii, spacings }: DefaultTheme,
  { fill, readOnly }: { fill: boolean; readOnly: boolean }
) => {
  const codeSurface = mode === 'light' ? colors.surface : colors.codeBg

  return EditorView.theme({
    '&': {
      backgroundColor: codeSurface,
      border: fill ? 'none' : `1px solid ${colors.codeBorder}`,
      borderRadius: fill ? '0' : `${radii.r10}px`,
      color: colors.textPrimary,
      fontSize: '13px',
      height: fill ? '100%' : 'auto',
    },
    '&.cm-focused': {
      outline: 'none',
    },
    '.cm-scroller': {
      fontFamily: MONO,
      lineHeight: '20px',
      overflow: 'auto',
    },
    '.cm-content': {
      caretColor: colors.textPrimary,
      padding: `${spacings.s12}px 0`,
    },
    '.cm-line': {
      padding: `0 ${readOnly ? spacings.s16 : spacings.s12}px`,
    },
    '.cm-gutters': {
      backgroundColor: codeSurface,
      border: 'none',
      color: colors.textTertiary,
    },
    '.cm-case-gutter': {
      width: '18px',
    },
    '.cm-case-gutter .cm-gutterElement': {
      padding: '0',
    },
    '.cm-case-mark': {
      borderRadius: '50%',
      display: 'block',
      height: '8px',
      margin: '6px 0 0 5px',
      width: '8px',
    },
    '.cm-case-mark-passed': {
      backgroundColor: colors.success,
    },
    '.cm-case-mark-failed': {
      backgroundColor: colors.danger,
    },
    '.cm-case-mark-running': {
      animation: 'cm-case-spin 0.7s linear infinite',
      border: `1.5px solid ${colors.accent}`,
      borderTopColor: 'transparent',
      boxSizing: 'border-box',
    },
    '.cm-case-line-passed': {
      backgroundColor: colors.successBg,
    },
    '.cm-case-line-failed': {
      backgroundColor: colors.dangerBg,
    },
    '.cm-case-word-passed, .cm-case-word-passed span': {
      color: colors.success,
    },
    '.cm-case-word-failed, .cm-case-word-failed span': {
      color: colors.danger,
    },
    '.cm-case-message': {
      color: colors.danger,
      fontFamily: MONO,
      fontSize: '12px',
      lineHeight: '18px',
      margin: `0 0 ${spacings.s4}px`,
      padding: `0 ${readOnly ? spacings.s16 : spacings.s12}px`,
      whiteSpace: 'pre-wrap',
    },
    '.cm-activeLine': {
      backgroundColor: readOnly ? 'transparent' : colors.accentBg,
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'transparent',
      color: colors.textPrimary,
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: colors.textPrimary,
    },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: colors.accentSoft,
      },
    '.cm-lintRange-error': {
      backgroundColor: colors.dangerBg,
    },
    '.cm-tooltip': {
      backgroundColor: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: `${radii.r8}px`,
      color: colors.textPrimary,
      overflow: 'hidden',
    },
    '.cm-diagnostic': {
      fontFamily: MONO,
      padding: `${spacings.s6}px ${spacings.s12}px`,
    },
    '.cm-diagnostic-error': {
      borderLeftColor: colors.danger,
    },
    '.cm-lintRange-warning': {
      backgroundImage: 'none',
      textDecoration: `underline wavy ${colors.warning}`,
      textUnderlineOffset: '3px',
    },
    '.cm-diagnostic-warning': {
      borderLeftColor: colors.warning,
    },
    '.cm-lint-marker-warning': {
      backgroundColor: colors.warning,
      content: 'none',
      mask: WARNING_MARKER,
    },
    '.cm-diagnosticSource': {
      color: colors.textTertiary,
    },
    '.cm-diagnosticAction': {
      backgroundColor: colors.accent,
      borderRadius: `${radii.r8}px`,
      color: colors.white,
      font: 'inherit',
      padding: `${spacings.s2}px ${spacings.s8}px`,
    },
    '.cm-tooltip.cm-tooltip-autocomplete > ul': {
      fontFamily: MONO,
      maxHeight: '240px',
      padding: `${spacings.s4}px 0`,
    },
    '.cm-tooltip.cm-tooltip-autocomplete > ul > li': {
      padding: `${spacings.s2}px ${spacings.s8}px`,
    },
    '.cm-tooltip-autocomplete ul li[aria-selected]': {
      backgroundColor: colors.accentSoft,
      color: colors.textPrimary,
    },
    '.cm-completionIcon': {
      color: colors.textTertiary,
      opacity: '1',
    },
    '.cm-completionDetail': {
      color: colors.textTertiary,
      fontStyle: 'normal',
      marginLeft: `${spacings.s8}px`,
    },
    '.cm-completionMatchedText': {
      color: colors.accent,
      fontWeight: '600',
      textDecoration: 'none',
    },
    '.cm-completionInfo': {
      padding: `${spacings.s6}px ${spacings.s12}px`,
    },
    '.cm-placeholder': {
      color: colors.textTertiary,
    },
    '.cm-locked': {
      backgroundColor: colors.surfaceAlt,
      borderRadius: `${radii.r2}px`,
    },
  })
}

/**
 * Линии отступов. Цвета уже от текущей темы, поэтому светлый и тёмный варианты совпадают.
 */
export const indentExtension = ({ colors }: DefaultTheme) =>
  indentationMarkers({
    colors: {
      activeDark: colors.textTertiary,
      activeLight: colors.textTertiary,
      dark: colors.borderSoft,
      light: colors.borderSoft,
    },
    highlightActiveBlock: true,
    markerType: 'fullScope',
    thickness: 1,
  })
