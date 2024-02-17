<script lang="ts" setup>
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import { FwbAlert, FwbButton } from 'flowbite-vue'
import type { CalendarBare } from '@mono/server/src/shared/entities'
import Calendar from '@/components/Calendar.vue'

const calendars = ref<CalendarBare[]>([])

onBeforeMount(async () => {
  calendars.value = await trpc.calendar.list.query()
})
</script>

<template>
  <div class="DashboardView">
    <div
      v-if="calendars.length"
      data-testid="calendarList"
      class="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div v-for="calendar in calendars" :key="calendar.id" class="col-span-1">
        <Calendar :calendar="calendar" />
      </div>
    </div>
    <FwbAlert v-else data-testid="calendarListEmpty">No calendars yet!</FwbAlert>

    <div class="mt-4">
      <FwbButton
        component="RouterLink"
        tag="router-link"
        :href="{ name: 'CalendarCreate' } as any"
        data-testid="createCalendar"
        size="xl"
      >
        Add a new calendar
      </FwbButton>
    </div>
  </div>
</template>
