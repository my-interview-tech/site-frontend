// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/about`
  | `/about/ui/ui`
  | `/account`
  | `/contacts`
  | `/contacts/ui/ui`
  | `/forgot-password`
  | `/forgot-password/sent`
  | `/login`
  | `/register`
  | `/reset-password`
  | `/tasks`
  | `/topics`
  | `/topics/:tech`
  | `/topics/:tech/articles/:id`
  | `/topics/:tech/quizzes/:id`
  | `/topics/:tech/tasks/:id`

export type Params = {
  '/topics/:tech': { tech: string }
  '/topics/:tech/articles/:id': { tech: string; id: string }
  '/topics/:tech/quizzes/:id': { tech: string; id: string }
  '/topics/:tech/tasks/:id': { tech: string; id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
