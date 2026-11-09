import { ApiError, fetchApi, isApiMock } from '@my-interview/auth'
import type { ApiSchema } from '@my-interview/auth'

import type { TechnologyAd, TechnologyRecommendations, TechnologyRequest, TechnologyScreen } from '../model'

import * as mockApi from './mock'

type TechnologyDocument = Omit<TechnologyScreen, 'ad' | 'recommendations'>

const AD_PLACEMENT = 'technology-aside'

const topicPath = (slug: string): string => `/topics/${encodeURIComponent(slug)}`

export const loadTechnology = (request: TechnologyRequest): Promise<TechnologyDocument> => {
  if (isApiMock()) {
    return mockApi.loadTechnology(request)
  }

  return fetchApi<ApiSchema<'TechnologyPageDto'>>(topicPath(request.slug))
}

export const loadTechnologyRecommendations = (request: TechnologyRequest): Promise<TechnologyRecommendations> => {
  if (isApiMock()) {
    return mockApi.loadTechnologyRecommendations(request)
  }

  return fetchApi<ApiSchema<'TechnologyRecommendationsDto'>>(`${topicPath(request.slug)}/recommendations`)
}

export const loadAdSlot = (request: TechnologyRequest): Promise<TechnologyAd> => {
  if (isApiMock()) {
    return mockApi.loadAdSlot(request)
  }

  return fetchApi<ApiSchema<'TopicAdSlotDto'>>(`/ads/slots/${AD_PLACEMENT}`)
}

const withoutRecommendations = (error: unknown): undefined => {
  if (error instanceof ApiError && error.status === 404) {
    return undefined
  }

  throw error
}

/**
 * Экран целиком. Реклама и отсутствие рекомендаций не должны ронять список материалов.
 */
export const loadScreen = (request: TechnologyRequest): Promise<TechnologyScreen> =>
  Promise.all([
    loadTechnology(request),
    loadTechnologyRecommendations(request).catch(withoutRecommendations),
    loadAdSlot(request).catch((): undefined => undefined),
  ]).then(([page, recommendations, ad]) => ({ ...page, ...(recommendations && { recommendations }), ad }))
