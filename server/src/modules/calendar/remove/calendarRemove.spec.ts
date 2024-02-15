import { authContext } from '@tests/utils/context'
import { fakeUser, fakeCalendar } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { User, Calendar } from '@server/entities'
import calendarRouter from '../index'

describe('Remove Calendar', () => {
  it('should remove a calendar', async () => {
    // ARRANGE
    const db = await createTestDatabase()
    const user = await db.getRepository(User).save(fakeUser())
    const calendar = await db
      .getRepository(Calendar)
      .save(fakeCalendar({ userId: user.id }))

    const { remove } = calendarRouter.createCaller(authContext({ db }, user))

    // ACT
    await remove({ id: calendar.id })

    // ASSERT
    const deletedCalendar = await db
      .getRepository(Calendar)
      .findOneBy({ id: calendar.id })
    expect(deletedCalendar).toBeNull()
  })
})
