import { Event } from '@server/entities/event'
import { publicProcedure } from '@server/trpc'
import { z } from 'zod'

export default publicProcedure
  .input(z.object({ calendarId: z.number() }))
  .query(async ({ input: { calendarId }, ctx: { db } }) => {
    const events = await db.getRepository(Event).find({
      where: { calendarId },
    })

    return events
  })
