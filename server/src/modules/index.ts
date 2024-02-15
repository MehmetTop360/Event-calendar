import { router } from '../trpc'
import calendar from './calendar'
import event from './event'
import user from './user'

export const appRouter = router({
  calendar,
  event,
  user,
})

export type AppRouter = typeof appRouter
