import { router } from '@server/trpc'
import create from './create'
import view from './view'
import list from './list'
import remove from './remove'

export default router({
  create,
  list,
  view,
  remove,
})
