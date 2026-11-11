import type { QuizChoice, QuizComponent, QuizFooterButton, QuizNavBar, QuizTitle } from '../model'

const titleOf = (page: readonly QuizComponent[]): QuizTitle | undefined =>
  page.find((item): item is QuizTitle => item.component === 'title')

const choiceOf = (page: readonly QuizComponent[]): QuizChoice | undefined =>
  page.find((item): item is QuizChoice => item.component === 'choice')

const navOf = (page: readonly QuizComponent[]): QuizNavBar | undefined =>
  page.find((item): item is QuizNavBar => item.component === 'navBar')

const footerOf = (page: readonly QuizComponent[]): QuizFooterButton | undefined =>
  page.find((item): item is QuizFooterButton => item.component === 'footerButton')

const choiceIds = (pages: readonly (readonly QuizComponent[])[]): string[] =>
  pages.flatMap((page) => page.flatMap((item) => (item.component === 'choice' && item.visibility ? [item.id] : [])))

export { choiceIds, choiceOf, footerOf, navOf, titleOf }
