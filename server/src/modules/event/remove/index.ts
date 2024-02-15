import { Event } from '@server/entities/event'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ input: { id }, ctx: { authUser, db } }) => {
    if (!authUser) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to delete an event',
      })
    }

    const event = await db.getRepository(Event).findOne({
      where: { id },
      relations: ['calendar'],
    })

    if (!event) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Event not found',
      })
    }

    if (event.calendar.userId !== authUser.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You are not authorized to delete this event',
      })
    }

    await db.getRepository(Event).remove(event)
    return { message: 'Event deleted successfully' }
  })
