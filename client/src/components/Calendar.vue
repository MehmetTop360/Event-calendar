<script lang="ts" setup>
// import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import type { CalendarBare } from '@mono/server/src/shared/entities'
import { FwbButton } from 'flowbite-vue'
import Card from './Card.vue'
import { defineEmits } from 'vue'

const props = defineProps<{
  calendar: CalendarBare
}>()

const emits = defineEmits(['deleteCalendar'])

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this calendar?')) {
    emits('deleteCalendar', props.calendar.id)
  }
}
</script>

<template>
  <Card
    class="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
    data-testid="calendar"
  >
    <h5
      class="text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white sm:text-2xl"
    >
      {{ calendar.name }}
    </h5>
    <div class="flex justify-center w-full gap-2 sm:w-auto">
      <FwbButton
        @click="handleDelete"
        class="w-full px-4 py-2 text-xs sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
      >
        Delete
      </FwbButton>
      <FwbButton
        component="RouterLink"
        tag="router-link"
        data-testid="viewCalendarEvents"
        class="w-full px-4 py-2 text-xs sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
        :href="{ name: 'Calendar', params: { id: calendar.id } } as any"
      >
        View calendar
      </FwbButton>
      <!-- <ArrowRightIcon aria-hidden="true" class="inline w-4 h-4 ml-1"/> --->
    </div>
  </Card>
</template>
