<script lang="ts" setup>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import type { CalendarBare } from '@mono/server/src/shared/entities'
import { FwbButton } from 'flowbite-vue'
import Card from './Card.vue'

defineProps<{
  calendar: CalendarBare
}>()
</script>

<template>
  <Card
    class="flex flex-col items-center justify-between sm:flex-row sm:items-center"
    data-testid="calendar"
  >
    <h5
      class="px-4 py-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl"
    >
      {{ calendar.name }}
    </h5>
    <!-- prettier-ignore -->
    <FwbButton
      component="RouterLink"
      tag="router-link"
      data-testid="viewCalendarEvents"
      :href="{ name: 'Calendar', params: { id: calendar.id } } as any"
      class="mt-2 sm:mt-0 sm:pr-3"
    >
      View calendar events
      <ArrowRightIcon aria-hidden="true" class="inline w-4 h-4 ml-1" />
    </FwbButton>
  </Card>
</template>
