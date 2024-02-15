import { createTestDatabase } from '@tests/utils/database'
import { fakeCalendar, fakeEvent, fakeUser } from '@server/entities/tests/fakes'
import { Calendar, Event, User } from '@server/entities'
import { authContext } from '@tests/utils/context'
import eventRouter from '../index'

describe('Remove Event', () => {
  it('should remove an event', async () => {
    // Arrange
    const db = await createTestDatabase()

    const savedUser = await db.getRepository(User).save(fakeUser())
    const savedCalendar = await db
      .getRepository(Calendar)
      .save(fakeCalendar({ userId: savedUser.id }))
    const savedEvent = await db
      .getRepository(Event)
      .save(fakeEvent({ calendarId: savedCalendar.id }))

    const { remove } = eventRouter.createCaller(authContext({ db }, savedUser))

    // Act
    await remove({ id: savedEvent.id })

    // Assert
    const deletedEvent = await db
      .getRepository(Event)
      .findOneBy({ id: savedEvent.id })
    expect(deletedEvent).toBeNull()
  })
})
