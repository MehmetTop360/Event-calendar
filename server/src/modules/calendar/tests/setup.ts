import { createTestDatabase } from '@tests/utils/database'
import { fakeCalendar } from '@server/entities/tests/fakes'
import { Calendar } from '@server/entities'

export default async function setupCalendarTest() {
  const db = await createTestDatabase()

  const calendar = await db.getRepository(Calendar).save(fakeCalendar())

  return {
    db,
    calendar,
  }
}
