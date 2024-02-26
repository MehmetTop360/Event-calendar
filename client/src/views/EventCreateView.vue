<script setup lang="ts">
import { trpc } from '@/trpc'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FwbHeading, FwbButton, FwbInput } from 'flowbite-vue'
import useErrorMessage from '@/composables/useErrorMessage'
import AlertError from '@/components/AlertError.vue'
import type { EventType } from '@mono/server/src/shared/entities'

const router = useRouter()
const calendarId = Number(router.currentRoute.value.params.id)
const eventForm = ref({
  title: '',
  description: '',
  eventDate: new Date(),
  duration: 60,
  type: 'MEETUP',
  calendarId: calendarId,
  startTime: '09:00',
})

const [createEvent, errorMessage] = useErrorMessage(async () => {
  await trpc.event.create.mutate({
    ...eventForm.value,
    type: eventForm.value.type as EventType,
  })

  router.back()
})
</script>

<template>
  <div class="EventCreateView px-4 py-10">
    <div class="mx-auto max-w-md">
      <form @submit.prevent="createEvent" class="space-y-6">
        <FwbHeading tag="h4">Create a new Event</FwbHeading>
        <div class="mt-6">
          <FwbInput
            label="Event Title"
            placeholder="Enter event title"
            v-model="eventForm.title"
            :minlength="5"
            required
          />
        </div>

        <div class="mt-6">
          <FwbInput
            label="Event Description"
            placeholder="Enter event description"
            v-model="eventForm.description"
            :minlength="10"
            required
          />
        </div>

        <div>
          <label for="date" class="block text-sm font-medium text-gray-700"
            >Event Date & Time</label
          >
          <VDatePicker v-model="eventForm.eventDate" mode="dateTime">
            <template #default="{ inputValue, togglePopover }">
              <button
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                @click.stop.prevent="togglePopover"
              >
                {{ inputValue || 'Select date' }}
              </button>
            </template>
          </VDatePicker>
        </div>

        <FwbInput
          label="Duration (in minutes)"
          type="number"
          min="0"
          :modelValue="eventForm.duration.toString()"
          @update:modelValue="(val) => (eventForm.duration = Number(val))"
          required
        />

        <div>
          <label for="type" class="block text-sm font-medium text-gray-700">Event Type</label>
          <select
            id="type"
            v-model="eventForm.type"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          >
            <option value="MEETUP">Meetup</option>
            <option value="HOUSE_PARTY">House Party</option>
            <option value="BIRTHDAY">Birthday</option>
            <option value="WORK">Work</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <AlertError :message="errorMessage" />

        <div
          class="mt-6 flex items-center justify-between space-x-3 text-center text-sm font-semibold"
        >
          <FwbButton class="w-full" variant="light" @click="router.back()"> Cancel </FwbButton>
          <FwbButton type="submit" class="w-full"> Create Event </FwbButton>
        </div>
      </form>
    </div>
  </div>
</template>
