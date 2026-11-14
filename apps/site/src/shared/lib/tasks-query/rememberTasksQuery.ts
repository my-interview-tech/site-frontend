const KEY = 'tasks-query'

/**
 * Запоминание запроса задач.
 */
export const rememberTasksQuery = (query: string) => {
  try {
    if (query) {
      window.sessionStorage.setItem(KEY, query)
    } else {
      window.sessionStorage.removeItem(KEY)
    }
  } catch {
    // Хранилище недоступно: возврат к списку просто откроет его без фильтров.
  }
}

/**
 * Адрес каталога задач с последними фильтрами из этой вкладки.
 */
export const tasksHrefOf = () => {
  const base = '/tasks'

  try {
    const query = window.sessionStorage.getItem(KEY)

    return query ? `${base}?${query}` : base
  } catch {
    return base
  }
}
