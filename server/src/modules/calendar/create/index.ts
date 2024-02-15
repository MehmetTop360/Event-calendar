import { Calendar, calendarInsertSchema } from '@server/entities/calendar'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { v4 as uuidv4 } from 'uuid'

export default authenticatedProcedure
  .input(calendarInsertSchema.omit({ createdAt: true, userId: true }))

  .mutation(async ({ input: calendarData, ctx: { authUser, db } }) => {
    const newCalendar = {
      ...calendarData,
      permalink: calendarData.permalink || uuidv4(), // Using provided permalink or generating a new one
      createdAt: new Date(),
      userId: authUser.id,
    }

    const createdCalendar = await db.getRepository(Calendar).save(newCalendar)
    return createdCalendar
  })
