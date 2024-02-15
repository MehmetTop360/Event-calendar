<script setup lang="ts">
import type { EventBare } from '@mono/server/src/shared/entities'

defineProps<{
  event: EventBare
}>()
</script>

<template>
  <div :class="event" class="rounded p-1 text-xs leading-tight">
    {{ event.title }}
  </div>
</template>
