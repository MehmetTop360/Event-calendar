<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useEventStore } from '@/stores/event'
import { useRoute } from 'vue-router'
import Event from '@/components/Event.vue'

const route = useRoute()
const eventStore = useEventStore()
const calendarAttributes = ref([])
const masks = {
  weekdays: 'WWW',
  dayPopover: 'WWW, MMM D, YYYY',
}
const calendarId = Number(route.params.id)

onMounted(async () => {
  console.log('calendarId:', calendarId)
  console.log('Calling fetchEvents...')
  await eventStore.fetchEvents(calendarId)
  console.log('fetchEvents response:', eventStore.events)
  calendarAttributes.value = eventStore.events.map((event) => ({
    dates: [new Date(event.eventDate)],
    class: 'bg-blue-500 text-white',
  }))
  console.log('calendarAttributes:', calendarAttributes.value)
})
</script>

<template>
  <div class="CalendarView">
    <h1 class="mb-4 text-center text-3xl font-semibold">Calendar</h1>
    <div class="flex justify-center">
      <div class="w-full max-w-4xl text-center font-bold">
        <VCalendar :masks="masks" :attributes="calendarAttributes" disable-page-swipe expanded>
          <template v-slot:day-content="{ day, events }">
            <div class="p-1">
              <p class="text-sm">{{ day.day }}</p>
              <ul>
                <Event v-for="event in events" :key="event.id" :event="event" />
              </ul>
            </div>
          </template>
        </VCalendar>
      </div>
    </div>
  </div>
</template>
