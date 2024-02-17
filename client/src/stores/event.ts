import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EventBare } from '@mono/server/src/shared/entities'
import { trpc } from '@/trpc'

export const useEventStore = defineStore('event', () => {
  const events = ref<EventBare[]>([])

  const fetchEvents = async (calendarId: number) => {
    const fetchedEvents = await trpc.event.list.query({ calendarId })
    events.value = fetchedEvents
  }

  return {
    events,
    fetchEvents,
  }
})
