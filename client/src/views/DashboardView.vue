<script lang="ts" setup>
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import { FwbAlert, FwbButton } from 'flowbite-vue'
import type { CalendarBare } from '@mono/server/src/shared/entities'
import Calendar from '@/components/Calendar.vue'

// If we want to get a type error at the place of assignment of
// projects.values, then we would declare the type of projects explicitly:
const calendars = ref<CalendarBare[]>([])

// If we wanted to get a type error at the place of usage of non-existent
// or incorrectly typed properties, then we would declare the
// type of projects simply as being whatever the query returns:
// const projects = ref<Awaited<ReturnType<typeof trpc.project.find.query>>>([])

onBeforeMount(async () => {
  calendars.value = await trpc.calendar.list.query()
})
</script>

<template>
  <div class="DashboardView">
    <div v-if="calendars.length" data-testid="calendarList" class="-mx-2 flex flex-wrap">
      <div v-for="calendar in calendars" :key="calendar.id" class="w-full p-2 sm:w-1/2 md:w-1/3">
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
