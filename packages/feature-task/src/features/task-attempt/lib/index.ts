import type { RunReport } from '@task/shared/model'
import type { CodeEditorDiagnostic } from '@task/shared/ui'

/**
 * Что отметить в редакторе после прогона: ошибку модуля или первое исключение в открытом тесте.
 */
export const diagnosticOf = (report: RunReport): CodeEditorDiagnostic | null => {
  if (report.error && report.errorAt) {
    return { ...report.errorAt, kind: report.errorKind ?? 'syntax', message: report.error }
  }

  const failed = report.cases.find((item) => item.errorAt && item.message)

  return failed?.errorAt ? { ...failed.errorAt, kind: 'runtime', message: failed.message ?? '' } : null
}

/**
 * Все тесты прошли и хотя бы один был.
 */
export const isAccepted = (report: RunReport): boolean =>
  !report.error && report.cases.length > 0 && report.cases.every((item) => item.passed)
