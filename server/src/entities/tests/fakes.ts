import { v4 as uuidv4 } from 'uuid'
import type { Calendar } from '@server/entities/calendar'
import { EventType, type Event } from '@server/entities/event'
import type { User } from '@server/entities/user'
import { random } from '@tests/utils/random'

const randomId = () => random.integer({ min: 1, max: 2147483647 })

export const fakeUser = <T extends Partial<User>>(overrides: T = {} as T) => ({
  id: randomId(),
  email: `test${randomId()}@example.com`,
  password: 'testPassword.123!',
  ...overrides,
})

export const fakeCalendar = <T extends Partial<Calendar>>(
  overrides: T = {} as T
) => ({
  id: randomId(),
  name: 'Work Calendar',
  permalink: uuidv4(),
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: randomId(),
  ...overrides,
})

export const fakeEvent = <T extends Partial<Event>>(
  overrides: T = {} as T
) => ({
  id: randomId(),
  calendarId: randomId(),
  title: 'Meeting with team',
  description: 'Discuss project progress',
  eventDate: new Date(),
  startTime: '10:00:00',
  duration: 60,
  type: EventType.MEETUP,
  createdAt: new Date(),
  ...overrides,
})
