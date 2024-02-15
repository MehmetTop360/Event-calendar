import { Event, eventInsertSchema } from '@server/entities/event'
import { publicProcedure } from '@server/trpc'

export default publicProcedure
  .input(eventInsertSchema.omit({ id: true, createdAt: true }))

  .mutation(async ({ input: eventData, ctx: { db } }) => {
    const newEvent: Partial<Event> = {
      ...eventData,
      createdAt: new Date(),
    }

    const createdEvent = await db.getRepository(Event).save(newEvent)
    return createdEvent
  })
