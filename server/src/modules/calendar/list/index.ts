import { Calendar, type CalendarBare } from '@server/entities/calendar'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

export default authenticatedProcedure.query(
  async ({ ctx: { authUser, db } }) => {
    const userId = authUser.id

    if (!authUser) {
      throw new Error('You must be logged in to view calendars')
    }

    const calendars = (await db.getRepository(Calendar).find({
      where: { userId },
      order: { id: 'ASC' },
    })) as CalendarBare[]

    return calendars
  }
)
