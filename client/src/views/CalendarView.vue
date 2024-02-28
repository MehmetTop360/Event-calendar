<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useEventStore } from '@/stores/event'
import { useRoute } from 'vue-router'
import type { EventType, EventBare } from '@mono/server/src/shared/entities'
import { FwbButton } from 'flowbite-vue'
import { trpc } from '@/trpc'
import { useCalendarStore } from '@/stores/calendar'

const router = useRoute()
const eventStore = useEventStore()
const calendarStore = useCalendarStore()
const loadErrorMessage = ref('')
const calendarAttributes = ref([
  {
    key: 'today',
    dates: [new Date()],
    highlight: true,
    order: 0,
    customData: {
      title: 'Today',
      dates: [new Date()],
      time: '',
    },
  },
])
const futureEvents = ref([] as EventBare[])

const masks = {
  weekdays: 'WWW',
  dayPopover: 'WWW, MMM D, YYYY',
}

const eventTypeColors: Record<EventType, string> = {
  MEETUP: 'red',
  HOUSE_PARTY: 'green',
  BIRTHDAY: 'blue',
  WORK: 'purple',
  OTHER: 'orange',
}

const getColor = (type: EventType) => {
  return eventTypeColors[type]
}

onMounted(async () => {
  const permalink = router.params.permalink
  if (typeof permalink !== 'string') {
    loadErrorMessage.value = 'Invalid calendar link.'
    return
  }

  const calendar = await calendarStore.getCalendarByPermalink(permalink)
  const calendarId = calendar.id
  const today = new Date()
  await eventStore.fetchEvents(calendarId)

  const allEvents = eventStore.events
  futureEvents.value = allEvents.filter((event) => new Date(event.eventDate) >= today)

  allEvents.forEach((event) => {
    const color = getColor(event.type as EventType)

    calendarAttributes.value.push({
      key: event.id.toString(),
      dates: [new Date(event.eventDate)],
      // Dot type error is due to mismatch between the TypeScript type definitions and the actual JavaScript implementation of VCalendar
      // @ts-ignore dot type error
      dot: { color },
      popover: {
        label: `${event.title} at ${event.startTime.substring(0, 5)}`,
        visibility: 'hover-focus',
      },
      order: 0,
      customData: {
        title: event.title,
        time: event.startTime.substring(0, 5),
        dates: [new Date(event.eventDate)],
      },
    })
  })
})

const eventCreateUrl = computed(() => {
  const permalink = router.params.permalink
  return permalink ? `/calendar/${permalink}/event/create` : '#'
})

function copyPublicUrl() {
  const permalink = router.params.permalink
  const url = `${window.location.origin}/calendar/${permalink}`
  navigator.clipboard.writeText(url).then(() => {
    alert('Public URL copied to clipboard!')
  })
}

const deleteErrorMessage = ref('')

async function deleteEvent(eventId: number) {
  try {
    await trpc.event.remove.mutate({ id: eventId })
    futureEvents.value = futureEvents.value.filter((event) => event.id !== eventId)
  } catch (error) {
    if (error instanceof Error) {
      deleteErrorMessage.value = error.message
    }
  }
}
</script>

<template>
  <div class="CalendarView pt-10">
    <div class="mx-auto max-w-6xl px-4">
      <h1 class="mb-4 text-center text-3xl font-semibold">Calendar</h1>
      <div v-if="loadErrorMessage" class="alert alert-danger">
        {{ loadErrorMessage }}
      </div>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div class="order-2 lg:order-1 lg:col-span-2">
          <VCalendar :attributes="calendarAttributes" :masks="masks" disable-page-swipe expanded>
            <template v-slot:day-popover="{ day, attributes }">
              <div class="px-2">
                <div class="text-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {{ day.formattedDayPopover }}
                </div>
                <ul>
                  <li
                    v-for="attr in attributes"
                    :key="attr.key"
                    class="block text-xs text-gray-700 dark:text-gray-300"
                  >
                    {{ attr.customData.title }} at {{ attr.customData.time }}
                  </li>
                </ul>
              </div>
            </template>
          </VCalendar>
        </div>
        <div class="order-1 mb-4 text-center lg:order-2 lg:col-span-1">
          <h2 class="mb-4 text-center text-2xl font-semibold">Upcoming Events</h2>
          <div
            v-for="event in futureEvents.slice(0, 3)"
            :key="event.id"
            class="relative mb-4 rounded-lg bg-white p-4 text-left shadow"
            :style="{
              borderColor: getColor(event.type as EventType),
              borderWidth: '1px',
              borderStyle: 'solid',
            }"
          >
            <div
              v-if="deleteErrorMessage"
              class="absolute right-10 top-1 rounded bg-red-100 p-2 text-xs text-red-600"
            >
              {{ deleteErrorMessage }}
            </div>
            <img
              src="@/assets/trash.png"
              class="absolute right-2 top-2 h-6 w-6 cursor-pointer"
              @click="deleteEvent(event.id)"
              alt="Delete"
            />
            <h3 class="text-xl">{{ event.title }}</h3>
            <p class="text-sm text-gray-600">{{ event.description }}</p>
            <p class="text-sm">Date: {{ new Date(event.eventDate).toLocaleDateString() }}</p>
            <p class="text-sm">
              Time: {{ event.startTime.split(':')[0] }}:{{ event.startTime.split(':')[1] }}
            </p>
            <p class="text-sm">Duration: {{ event.duration }} minutes</p>
            <p class="text-sm">Type: {{ event.type }}</p>
          </div>
        </div>
        <div class="order-3 col-span-1 lg:col-span-3">
          <div
            class="mt-4 flex flex-col items-center gap-4 text-center lg:col-span-3 lg:w-full lg:flex-row lg:justify-center"
          >
            <FwbButton @click="copyPublicUrl" class="w-full lg:w-auto">Copy Public URL</FwbButton>
            <FwbButton :href="eventCreateUrl" tag="router-link" class="w-full lg:w-auto"
              >Add Event</FwbButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
