import { defineStore } from 'pinia'
import { ref } from 'vue'
import { trpc } from '@/trpc'
import type { CalendarBare } from '@mono/server/src/shared/entities'

export const useCalendarStore = defineStore('calendar', () => {
  const calendars = ref<CalendarBare[]>([])

  const fetchCalendars = async () => {
    const fetchedCalendars = await trpc.calendar.list.query()
    calendars.value = fetchedCalendars
  }

  const getCalendarById = (id: number) => {
    const calendar = calendars.value.find((calendar) => calendar.id === id)
    return calendar
  }

  const getCalendarByPermalink = async (permalink: string) => {
    const calendar = await trpc.calendar.view.query({ permalink })
    return calendar
  }

  return {
    calendars,
    fetchCalendars,
    getCalendarById,
    getCalendarByPermalink,
  }
})
