import { authContext } from '@tests/utils/context'
import { fakeUser, fakeCalendar } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import calendarRouter from '../index'

it('should create a persisted calendar', async () => {
  // ARRANGE
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUser())

  const { create } = calendarRouter.createCaller(authContext({ db }, user))

  // ACT
  const fakeCalendarData = fakeCalendar({ userId: user.id })
  const calendarCreated = await create({
    name: fakeCalendarData.name,
    permalink: fakeCalendarData.permalink,
  })

  // Warning that im saving the calendars and events to the table when I test them

  // ASSERT
  expect(calendarCreated).toMatchObject({
    id: expect.any(Number),
    permalink: fakeCalendarData.permalink,
    userId: user.id,
  })
})
