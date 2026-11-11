import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { choiceIds, choiceOf, emptyValues, footerOf, navOf, quizSchema, statusOf, titleOf } from '@quiz/shared/lib'
import type { ResultItem } from '@quiz/shared/model'

import type { QuizFormProps } from '../../types'
import type { QuizPhase, QuizReview, QuizSession } from './types'

const START_DELAY_MS = 600

/**
 * Сессия попытки: таймер, шаг и сдача.
 *
 * @description
 * Смена шага и возврат к описанию отсчёт не сбрасывают.
 * Если общее время вышло, пустые ответы помечаются «Не ответил».
 */
export const useQuizSession = ({
  answers,
  id,
  onSolved,
  pages,
  questionSeconds,
  retryAt,
  serverDate,
  tech,
}: QuizFormProps): QuizSession => {
  const totalSeconds = pages.length * questionSeconds
  const loadedAt = useRef(Date.now())
  const timeUp = useRef(false)
  const [elapsed, setElapsed] = useState(0)
  const [started, setStarted] = useState(false)
  const [isOnIntro, setIsOnIntro] = useState(true)
  const [isStarting, setIsStarting] = useState(false)
  const [step, setStep] = useState(0)
  const [reached, setReached] = useState(0)
  const [left, setLeft] = useState(totalSeconds)
  const [missed, setMissed] = useState<ReadonlySet<string>>(new Set())
  const [given, setGiven] = useState<Record<string, string>>({})
  const [result, setResult] = useState<ResultItem[] | null>(null)
  const [reviewIndex, setReviewIndex] = useState<number | null>(null)
  const ids = useMemo(() => choiceIds(pages), [pages])
  const schema = useMemo(() => quizSchema(ids), [ids])
  const { formState, getValues, reset, setValue, trigger, control } = useForm<Record<string, string>>({
    defaultValues: emptyValues(ids),
    resolver: yupResolver(schema),
  })
  const watched = useWatch({ control })
  const page = pages[step]
  const choice = page ? choiceOf(page) : undefined
  const titleNode = page ? titleOf(page) : undefined
  const nav = page ? navOf(page) : undefined
  const footer = page ? footerOf(page) : undefined
  const isLast = step >= pages.length - 1
  const canGoBack = step > 0 && Boolean(nav?.isStepBackAvailable)
  const serverNow = serverDate.value + elapsed
  const wait = retryAt === null ? 0 : Math.max(0, retryAt - serverNow)
  const passed = result?.every((item) => item.status === 'correct') ?? false
  const correctCount = result?.filter((item) => item.status === 'correct').length ?? 0
  const wrongCount = result?.filter((item) => item.status === 'wrong').length ?? 0
  const emptyCount = result?.filter((item) => item.status === 'empty').length ?? 0
  const visibleChoice = choice?.visibility ? choice : undefined
  const fieldMessage = visibleChoice ? formState.errors[visibleChoice.id]?.message : undefined
  const error = typeof fieldMessage === 'string' ? fieldMessage : undefined
  const value = visibleChoice ? watched?.[visibleChoice.id] ?? '' : ''

  const finish = useCallback(
    (values: Record<string, string>) => {
      const items = ids.flatMap((choiceId) => {
        const question = pages
          .flatMap((item) => item)
          .find((item) => item.component === 'choice' && item.id === choiceId)

        if (!question || question.component !== 'choice') {
          return []
        }

        return [
          {
            id: choiceId,
            label: question.label,
            status: statusOf(values[choiceId], answers[choiceId]),
          },
        ]
      })

      setGiven(values)
      setReviewIndex(null)
      setResult(items)

      if (items.length > 0 && items.every((item) => item.status === 'correct')) {
        onSolved?.({ id, tech })
      }
    },
    [answers, id, ids, onSolved, pages, tech]
  )

  const retry = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    reset(emptyValues(ids))
    timeUp.current = false
    setGiven({})
    setMissed(new Set())
    setResult(null)
    setReviewIndex(null)
    setStep(0)
    setReached(0)
    setLeft(totalSeconds)
    setStarted(false)
    setIsOnIntro(true)
    setIsStarting(false)
  }

  const openReached = (index: number) => {
    if (index > reached || index === step) {
      return
    }

    setStep(index)
  }

  const goNext = (next: number) => {
    setReached((current) => Math.max(current, next))
    setStep(next)
  }

  const onForward = async () => {
    if (choice?.visibility) {
      const isValid = await trigger(choice.id)

      if (!isValid) {
        return
      }
    }

    goNext(step + 1)
  }

  const begin = () => {
    if (started) {
      setIsOnIntro(false)

      return
    }

    setIsStarting(true)
    window.setTimeout(() => {
      setIsStarting(false)
      setStarted(true)
      setIsOnIntro(false)
    }, START_DELAY_MS)
  }

  const select = (optionId: string) => {
    if (!visibleChoice) {
      return
    }

    const choiceId = visibleChoice.id

    setValue(choiceId, optionId)
    setMissed((current) => {
      if (!current.has(choiceId)) {
        return current
      }

      const next = new Set(current)

      next.delete(choiceId)

      return next
    })
  }

  const back = () => {
    setStep((current) => current - 1)
  }

  const toIntro = () => {
    setIsOnIntro(true)
  }

  const onFinish = () => {
    finish(getValues())
  }

  const onPrimary = () => {
    if (isLast || footer?.buttonAction === 'submit') {
      finish(getValues())

      return
    }

    void onForward()
  }

  const openStep = (index: number) => {
    if (result) {
      setReviewIndex((current) => (current === index ? null : index))

      return
    }

    openReached(index)
  }

  const openSummary = () => {
    setReviewIndex(null)
  }

  const openReview = (choiceId: string) => {
    const index = pages.findIndex((itemPage) => choiceOf(itemPage)?.id === choiceId)

    if (index >= 0) {
      setReviewIndex(index)
    }
  }

  useEffect(() => {
    if (retryAt === null) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - loadedAt.current) / 1000))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [retryAt])

  useEffect(() => {
    if (!started || result || left !== 0 || timeUp.current) {
      return
    }

    timeUp.current = true
    const values = getValues()

    setMissed((current) => {
      const next = new Set(current)

      ids.forEach((choiceId) => {
        if (!values[choiceId]) {
          next.add(choiceId)
        }
      })

      return next
    })
    finish(values)
  }, [finish, getValues, ids, left, result, started])

  useEffect(() => {
    if (!started || result) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setLeft((current) => (current <= 1 ? 0 : current - 1))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [result, started])

  const reviewedPage = reviewIndex === null ? undefined : pages[reviewIndex]
  const reviewedChoice = reviewedPage ? choiceOf(reviewedPage) : undefined
  const reviewedItem = reviewedChoice ? result?.find((item) => item.id === reviewedChoice.id) : undefined
  const picked = reviewedChoice?.options.find((option) => option.id === given[reviewedChoice.id])
  const review: QuizReview | null =
    reviewIndex !== null && reviewedChoice && reviewedItem
      ? {
          answer: picked?.label ?? null,
          pagesCount: pages.length,
          question: reviewedChoice.label,
          status: reviewedItem.status,
          stepNumber: reviewIndex + 1,
        }
      : null

  const phase: QuizPhase = (() => {
    if (started && result) {
      return 'result'
    }

    if (wait === 0 && !result && (!started || isOnIntro)) {
      return 'intro'
    }

    if (started && !isOnIntro && !result && page) {
      return 'question'
    }

    return 'cooldown'
  })()

  return {
    back,
    begin,
    canGoBack,
    choice: visibleChoice,
    correctCount,
    description: titleNode?.visibility ? titleNode.label : undefined,
    emptyCount,
    error,
    footerLabel: footer?.label,
    isOnIntro,
    isStarting,
    left,
    missed,
    navLabel: nav?.label,
    onFinish,
    onPrimary,
    openReview,
    openStep,
    openSummary,
    passed,
    phase,
    reached,
    result,
    retry,
    review,
    reviewIndex,
    select,
    started,
    step,
    toIntro,
    totalSeconds,
    value,
    wait,
    wrongCount,
  }
}
