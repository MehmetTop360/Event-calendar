import { Calendar } from '@server/entities/calendar'
import { Event } from '@server/entities/event'
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

    const calendar = await db.getRepository(Calendar).findOne({ where: { id } })

    if (!calendar) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Calendar not found',
      })
    }

    const events = await db
      .getRepository(Event)
      .find({ where: { calendar: { id: calendar.id } } })
    await db.getRepository(Event).remove(events)

    await db.getRepository(Calendar).remove(calendar)
    return { message: 'Calendar deleted successfully' }
  })
