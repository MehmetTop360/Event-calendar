import { authContext } from '@tests/utils/context'
import { fakeUser, fakeEvent, fakeCalendar } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { Calendar, User } from '@server/entities'
import eventRouter from '../index'

describe('Event Creation', () => {
  it('should create a persisted event', async () => {
    // ARRANGE
    const db = await createTestDatabase()
    const user = await db.getRepository(User).save(fakeUser())
    const calendar = await db
      .getRepository(Calendar)
      .save(fakeCalendar({ userId: user.id }))
    const { create } = eventRouter.createCaller(authContext({ db }, user))

    // ACT
    const fakeEventData = fakeEvent({
      userId: user.id,
      calendarId: calendar.id,
    })

    const eventCreated = await create({
      title: fakeEventData.title,
      description: fakeEventData.description,
      startTime: fakeEventData.startTime,
      type: fakeEventData.type,
      calendarId: fakeEventData.calendarId,
      eventDate: fakeEventData.eventDate,
      duration: fakeEventData.duration,
    })

    // ASSERT
    expect(eventCreated).toMatchObject({
      id: expect.any(Number),
      title: fakeEventData.title,
      description: fakeEventData.description,
      startTime: fakeEventData.startTime,
      type: fakeEventData.type,
      calendarId: fakeEventData.calendarId,
      eventDate: fakeEventData.eventDate,
      duration: fakeEventData.duration,
    })
  })
})
