import { Calendar } from '@server/entities/calendar'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export default authenticatedProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ input: { id }, ctx: { authUser, db } }) => {
    if (!authUser) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to delete a calendar',
      })
    }

    const calendar = await db
      .getRepository(Calendar)
      .findOneBy({ id, userId: authUser.id })
    if (!calendar) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message:
          'Calendar not found or you do not have permission to delete it',
      })
    }

    await db.getRepository(Calendar).remove(calendar)
    return { message: 'Calendar deleted successfully' }
  })
