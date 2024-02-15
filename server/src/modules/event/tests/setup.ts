import { createTestDatabase } from '@tests/utils/database'
import { fakeEvent } from '@server/entities/tests/fakes'
import { Event } from '@server/entities'

export default async function setupEventTest() {
  const db = await createTestDatabase()

  const event = await db.getRepository(Event).save(fakeEvent())

  return {
    db,
    event,
  }
}
