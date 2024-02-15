<script setup lang="ts">
import { trpc } from '@/trpc'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FwbButton, FwbHeading, FwbInput } from 'flowbite-vue'
import useErrorMessage from '@/composables/useErrorMessage'
import AlertError from '@/components/AlertError.vue'

const router = useRouter()

const calendarForm = ref({
  name: '',
  permalink: '',
})

const [createProject, errorMessage] = useErrorMessage(async () => {
  await trpc.calendar.create.mutate(calendarForm.value)

  router.push({ name: 'Dashboard' })
})
</script>

<template>
  <div class="flex items-center justify-between">
    <form aria-label="Project" @submit.prevent="createProject">
      <div class="space-y-6">
        <FwbHeading tag="h4">Create a new project</FwbHeading>

        <div class="mt-6">
          <FwbInput
            aria-label="calendar name"
            v-model="calendarForm.name"
            :minlength="2"
            label="Project name"
            placeholder="My project"
          />
        </div>
        <div class="mt-6">
          <FwbInput
            aria-label="calendar permalink"
            v-model="calendarForm.permalink"
            :minlength="2"
            label="Calendar permalink"
            placeholder="Work"
          />
        </div>
      </div>

      <AlertError :message="errorMessage" />

      <div class="mt-6 grid grid-cols-2 items-center gap-3">
        <FwbButton type="submit">Save</FwbButton>
        <RouterLink
          class="text-center text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          component="RouterLink"
          :to="{ name: 'Dashboard' }"
          >Cancel</RouterLink
        >
      </div>
    </form>
  </div>
</template>
