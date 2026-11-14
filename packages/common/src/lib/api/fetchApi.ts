declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string
    readonly VITE_API_MOCK?: string
  }
}

const apiUrl = (): string => import.meta.env.VITE_API_URL || 'http://localhost:8080'

/** Ответ API с HTTP-статусом. `instanceof` отличает 404 от обрыва сети. */
export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/**
 * `true`, когда экраны должны читать моки, а не API.
 * TODO: на тесте мок включён через `TEST_VITE_API_MOCK`, пока нет `api.test.my-interview.tech`. Выключить, когда появится бэкенд.
 */
export const isApiMock = (): boolean => import.meta.env.VITE_API_MOCK === 'true'

/** GET JSON с корня API. Неуспешный статус — `ApiError`. */
export const fetchApi = async <Data>(path: string): Promise<Data> => {
  const response = await fetch(`${apiUrl()}${path}`, { credentials: 'include' })

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText)
  }

  return response.json() as Promise<Data>
}
