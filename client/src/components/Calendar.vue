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
  <Card class="flex flex-row items-center justify-between" data-testid="calendar">
    <h5 class="px-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {{ calendar.name }}
    </h5>
    <!-- prettier-ignore -->
    <FwbButton
      component="RouterLink"
      tag="router-link"
      data-testid="viewCalendarEvents"
      :href="{ name: 'Calendar', params: { id: calendar.id } } as any"
      class="pr-3"
    >
      View calendar events
      <ArrowRightIcon aria-hidden="true" class="inline w-4 h-4" />
    </FwbButton>
  </Card>
</template>
