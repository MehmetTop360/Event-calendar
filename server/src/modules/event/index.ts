import { router } from '@server/trpc'
import create from './create'
import remove from './remove'
import list from './list'

export default router({
  create,
  remove,
  list,
})
