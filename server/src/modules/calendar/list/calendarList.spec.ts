import { createTestDatabase } from '@tests/utils/database'
import { fakeUser, fakeCalendar } from '@server/entities/tests/fakes'
import { User, Calendar } from '@server/entities'
import { authContext } from '@tests/utils/context'
import calendarRouter from '../index'

describe('List Calendars', () => {
  it('should return a list of user calendars', async () => {
    // Arrange
    const db = await createTestDatabase()
    const user = await db.getRepository(User).save(fakeUser())

    await db
      .getRepository(Calendar)
      .save([
        fakeCalendar({ userId: user.id }),
        fakeCalendar({ userId: user.id }),
      ])

    const { list } = calendarRouter.createCaller(authContext({ db }, user))

    // Act
    const userCalendars = await list()

    // Assert
    expect(userCalendars.length).toBe(2)
    expect(userCalendars[0].userId).toEqual(user.id)
    expect(userCalendars[1].userId).toEqual(user.id)
  })
})
