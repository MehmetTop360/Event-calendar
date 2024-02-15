import { createTestDatabase } from '@tests/utils/database'
import { fakeEvent, fakeCalendar, fakeUser } from '@server/entities/tests/fakes'
import { Calendar, Event, User } from '@server/entities'
import eventRouter from '../index'

describe('List Events', () => {
  it('should return a list of events for a given calendar', async () => {
    // Arrange
    const db = await createTestDatabase()
    const userData = fakeUser()
    const savedUser = await db.getRepository(User).save(userData)

    const calendarData = fakeCalendar({ userId: savedUser.id })
    const savedCalendar = await db.getRepository(Calendar).save(calendarData)

    await db.getRepository(Event).save([
      fakeEvent({
        calendarId: savedCalendar.id,
        eventDate: new Date(2024, 0, 1),
        startTime: '10:00:00',
        duration: 60,
      }),
      fakeEvent({
        calendarId: savedCalendar.id,
        eventDate: new Date(2024, 0, 2),
        startTime: '11:00:00',
        duration: 90,
      }),
    ])

    const { list } = eventRouter.createCaller({ db })

    // Act
    const events = await list({ calendarId: savedCalendar.id })

    // Assert
    expect(events.length).toBe(2)
    expect(events[0].calendarId).toEqual(savedCalendar.id)
    expect(events[1].calendarId).toEqual(savedCalendar.id)
  })
})
