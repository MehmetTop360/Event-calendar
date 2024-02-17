import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { validates } from '@server/utils/validation'
import { z } from 'zod'
import { Calendar } from './calendar'

const eventTypeEnum = z.enum([
  'MEETUP',
  'HOUSE_PARTY',
  'BIRTHDAY',
  'WORK',
  'OTHER',
])

@Entity()
export class Event {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Calendar, (calendar) => calendar.events)
  @JoinColumn()
  calendar: Calendar

  @Column('integer')
  calendarId: number

  @Column('text')
  title: string

  @Column('text', { nullable: true })
  description: string | null

  @Column('date')
  eventDate: Date

  @Column('time')
  startTime: string
  // Time in HH:MM:SS format
  // Time zones are not considered, UTC
  // time zones shown both for the local and the created time zone

  @Column('int')
  duration: number
  // Duration in minutes

  @Column('text')
  type: string

  @Column('timestamp with time zone')
  createdAt: Date

  @Column('timestamp with time zone', { nullable: true })
  updatedAt: Date | null
}

export type EventBare = Omit<Event, 'calendar'>

export const eventSchema = validates<EventBare>().with({
  id: z.number().int().positive(),
  calendarId: z.number().int().positive(),
  title: z.string().trim(),
  description: z.string().nullable(),
  eventDate: z.date(),
  startTime: z.string(),
  duration: z.number().int().nonnegative(),
  type: eventTypeEnum,
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
})

export const eventInsertSchema = eventSchema.omit({
  id: true,
  updatedAt: true,
})

export type EventInsert = z.infer<typeof eventInsertSchema>
