import { object, string, type ObjectSchema } from 'yup'

const REQUIRED_MESSAGE = 'Выберите ответ'

const quizSchema = (ids: readonly string[]): ObjectSchema<Record<string, string>> => {
  const shape = Object.fromEntries(ids.map((id) => [id, string().required(REQUIRED_MESSAGE)]))

  return object(shape).required()
}

export { quizSchema }
