import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { validates } from '@server/utils/validation'
import { z } from 'zod'
import { Event } from './event'
import { User } from './user'

@Entity()
export class Calendar {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  name: string

  @Column('text', { unique: true })
  permalink: string

  @Column('timestamp with time zone')
  createdAt: Date

  @Column('timestamp with time zone', { nullable: true })
  updatedAt: Date | null

  @ManyToOne(() => User, (user) => user.calendars)
  @JoinColumn()
  user: User

  @Column('integer')
  userId: number

  @OneToMany(() => Event, (event) => event.calendar)
  events: Event[]
}

export type CalendarBare = Omit<Calendar, 'events' | 'user'>

export const calendarSchema = validates<CalendarBare>().with({
  id: z.number().int().positive(),
  name: z
    .string()
    .trim()
    .min(2, 'Calendar name should be at least 4 characters long')
    .max(30),
  permalink: z.string().trim(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  userId: z.number().positive(),
})

export const calendarInsertSchema = calendarSchema.omit({
  id: true,
  updatedAt: true,
})

export type CalendarInsert = z.infer<typeof calendarInsertSchema>
