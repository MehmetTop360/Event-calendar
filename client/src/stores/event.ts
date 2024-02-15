import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EventBare } from '@mono/server/src/shared/entities'
import { trpc } from '@/trpc'

export const useEventStore = defineStore('event', () => {
  const events = ref<EventBare[]>([])

  const fetchEvents = async (calendarId: number) => {
    try {
      const fetchedEvents = await trpc.event.list.query({ calendarId })
      console.log('Fetched events:', fetchedEvents)
      events.value = fetchedEvents
    } catch (error) {
      console.error('Failed to fetch events:', error)
    }
  }

  return {
    events,
    fetchEvents,
  }
})
