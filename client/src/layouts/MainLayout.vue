<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FwbNavbar, FwbNavbarCollapse, FwbNavbarLink } from 'flowbite-vue'
import { isLoggedIn, logout } from '@/stores/user' // Assuming you have these functions in your user store

const router = useRouter()

// Define the links that should be visible based on login status
const links = computed(() => {
  if (isLoggedIn.value) {
    return [
      { label: 'Dashboard', name: 'Dashboard' },
      { label: 'Logout', name: 'Logout' },
      // Add other links for logged-in users here
    ]
  } else {
    return [
      { label: 'Login', name: 'Login' },
      { label: 'Signup', name: 'Signup' },
      // Add other links for guests here
    ]
  }
})

function handleLogout() {
  logout()
  router.push({ name: 'Login' })
}

const route = useRoute()

const navigation = computed(() =>
  links.value.map((item) => ({
    ...item,
    isActive: route.name === item.name,
  }))
)
</script>

<template>
  <FwbNavbar>
    <template #default="{ isShowMenu }">
      <FwbNavbar-collapse :isShowMenu="isShowMenu">
        <!-- prettier-ignore -->
        <FwbNavbarLink
          v-for="link in navigation"
          :key="link.name"
          :is-active="link.isActive"
          :link="link.name !== 'Logout' ? ({ name: link.name } as any) : undefined"
          link-attr="to"
          component="RouterLink"
          @click="link.name === 'Logout' && handleLogout()"
        >
          {{ link.label }}
        </FwbNavbarLink>
      </FwbNavbar-collapse>
    </template>
  </FwbNavbar>

  <main>
    <div class="container mx-auto px-6 py-8">
      <RouterView />
    </div>
  </main>
</template>
