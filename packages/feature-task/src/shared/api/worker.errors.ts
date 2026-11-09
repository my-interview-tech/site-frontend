const reported: unknown[] = []

// React 19 отдаёт ошибки обработчиков и рендера в `reportError` и запоминает его при загрузке react-dom,
// поэтому модуль грузится из prelude до React. Иначе ошибка в обработчике роняет весь прогон, а не один кейс.
Object.assign(globalThis, {
  reportError: (error: unknown) => {
    reported.push(error)
  },
})

/**
 * Ошибки, которые React сообщил с прошлого вызова.
 */
export const takeReported = () => reported.splice(0)
