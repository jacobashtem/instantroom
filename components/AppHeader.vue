<template>
  <div class="fixed top-0 bg-white w-full z-20 shadow-2xl">
    <header class="px-4 flex justify-between items-center my-3 mx-auto container max-w-6xl">
      <NuxtLink to="/" class="text-xl font-bold">
        <img class="w-52" src="/public/logo.png">
      </NuxtLink>
      <div>
        <NuxtLink v-if="!user" to="/login" class="text-sm font-semibold text-aquaBlue-500">
          Logowanie
        </NuxtLink>
        <NuxtLink v-if="user" to="/design" class="text-sm mr-4">
          Twórz
        </NuxtLink>
        <NuxtLink v-if="user" to="/generations" class="text-sm mr-4">Ostatnie wizualizacje</NuxtLink>
        <NuxtLink v-if="user" to="/cennik" class="text-sm mr-4">Cennik</NuxtLink>
        <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-64' }" v-if="user">
          <UAvatar :src="url" alt="Avatar" />
          <template #account="{ item }">
            <div class="text-left">
              <p>
                Zalogowany jako
              </p>
              <p class="font-medium text-gray-900 dark:text-white">
                {{ item.label }}
              </p>
            </div>
          </template>
          <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>
            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
          </template>
        </UDropdown>
      </div>
    </header>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser();
const { tokens, getTokens, updateTokens } = useUserTokens()
const route = useRoute()

const items = ref([
  [{
    label: user.value?.email,
    slot: 'account',
    disabled: true
  }], [{
    label: `Ilość tokenów: ${tokens.value}`,
    icon: 'i-heroicons-cog-8-tooth-20-solid',
    click: async () => navigateTo('/cennik')
  },
  {
    label: `Ustawienia profilu`,
    icon: 'i-heroicons-shopping-cart-solid',
    click: async () => navigateTo('/settings/profile')
  },
  
  {
    label: 'Wyloguj',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: async () => {
      console.log('before user', user);
      await supabase.auth.signOut()
      const { data: { user: userData } } = await supabase.auth.getUser()
      console.log('after user', user);
      useRedirectBasedOnAuth('/') 
    }
  }]
])

watch(tokens, (newTokens) => {
  items.value[1][0].label = `Ilość tokenów: ${newTokens}`
})
</script>