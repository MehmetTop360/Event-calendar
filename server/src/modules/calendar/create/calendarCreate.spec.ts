import { authContext } from '@tests/utils/context'
import { fakeUser, fakeCalendar } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import calendarRouter from '../index'

describe('Create Calendar', () => {
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

    // ASSERT
    expect(calendarCreated).toMatchObject({
      id: expect.any(Number),
      permalink: fakeCalendarData.permalink,
      userId: user.id,
    })
  })

  it('should create a calendar with a specific permalink', async () => {
    // Arrange
    const db = await createTestDatabase()
    const user = await db.getRepository(User).save(fakeUser())
    const { create } = calendarRouter.createCaller(authContext({ db }, user))

    // Act
    const fakeCalendarData = fakeCalendar({ userId: user.id })
    const createdCalendar = await create({
      name: fakeCalendarData.name,
      permalink: fakeCalendarData.permalink,
    })

    // Assert
    expect(createdCalendar.permalink).toEqual(fakeCalendarData.permalink)
  })
})
