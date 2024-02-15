import { createTestDatabase } from '@tests/utils/database'
import { fakeUser, fakeCalendar } from '@server/entities/tests/fakes'
import { User, Calendar } from '@server/entities'
import calendarRouter from '../index'

describe('View Calendar', () => {
  it('should return a specific calendar by permalink', async () => {
    // Arrange
    const db = await createTestDatabase()
    const user = await db.getRepository(User).save(fakeUser())
    const calendarData = fakeCalendar({ userId: user.id })
    const savedCalendar = await db.getRepository(Calendar).save(calendarData)

    const { view } = calendarRouter.createCaller({ db })

    // Act
    const viewedCalendar = await view({ permalink: savedCalendar.permalink })

    // Assert
    expect(viewedCalendar.permalink).toEqual(savedCalendar.permalink)
    expect(viewedCalendar.userId).toEqual(user.id)
  })
})
