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

  it('should not remove an event that does not exist', async () => {
    // Arrange
    const db = await createTestDatabase()
    const savedUser = await db.getRepository(User).save(fakeUser())
    const { remove } = eventRouter.createCaller(authContext({ db }, savedUser))

    // Act & Assert
    await expect(remove({ id: 9999 })).rejects.toThrow('Event not found')
  })

  it('should not allow a user to remove an event they do not own', async () => {
    // Arrange
    const db = await createTestDatabase()
    const savedUser1 = await db.getRepository(User).save(fakeUser())
    const savedUser2 = await db.getRepository(User).save(fakeUser())
    const savedCalendar = await db
      .getRepository(Calendar)
      .save(fakeCalendar({ userId: savedUser1.id }))
    const savedEvent = await db
      .getRepository(Event)
      .save(fakeEvent({ calendarId: savedCalendar.id }))

    const { remove } = eventRouter.createCaller(authContext({ db }, savedUser2))

    // Act & Assert
    await expect(remove({ id: savedEvent.id })).rejects.toThrow(
      'You are not authorized to delete this event'
    )
  })
})
