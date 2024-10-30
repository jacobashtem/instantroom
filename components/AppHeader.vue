<script setup>
import { useMediaQuery } from "@vueuse/core";
import { useRouter } from 'vue-router';
const isMobile = useMediaQuery("(max-width: 640px)");

const router = useRouter();
const { isLoggedIn, getUser, clearUser } = useLoggedIn();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const { tokens, getTokens, updateTokens } = useUserTokens(); // Przywrócone zarządzanie tokenami


onMounted(async () => {
  await getUser(); 
  await getTokens();
});

const logout = async () => {
  await supabase.auth.signOut();
  clearUser();
  router.push('/login');
};

const items = ref([
  [
    {
      label: user.value?.email || 'Nieznany użytkownik', 
      slot: 'account',
      disabled: true,
    },
  ],
  [
    {
      label: `Liczba tokenów: ${tokens.value}`,
      icon: 'i-heroicons-swatch-solid',
      url: '/cennik',
      click: async () => router.push('/cennik'),
    },
    {
      label: `Ustawienia profilu`,
      icon: 'i-heroicons-cog-8-tooth-20-solid',
      url: '/settings/profile',
      click: async () => router.push('/settings/profile'),
    },
    {
      label: `Wyloguj`,
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: async () => {
        await logout();
      },
    },
  ],
]);
watch(tokens, (newTokens) => {
  items.value[1][0].label = `Liczba tokenów: ${newTokens}`;
});
</script>

<template>
  <div class="fixed top-0 bg-white w-full z-30 shadow-2xl">
    <header class="px-4 flex justify-between items-center my-3 mx-auto container max-w-6xl">
      <NuxtLink to="/" class="text-xl font-bold">
        <img class="w-10" src="/public/logo.webp" />
      </NuxtLink>
      <div v-if="!isMobile">
        <!-- Logowanie -->
        <NuxtLink to="/blog" 
          :class="{'text-aquaBlue-500 font-semibold': !isLoggedIn}"
          class="text-sm mr-4">
          Blog
        </NuxtLink>
        <NuxtLink v-if="!isLoggedIn" to="/login" class="text-sm font-semibold text-aquaBlue-500">
          Logowanie / Rejestracja
        </NuxtLink>

        <!-- Tworzenie projektów -->
        <NuxtLink
          v-if="isLoggedIn"
          to="/design"
          class="focus:shadow-outline focus:outline-none tracking-wide font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 py-2 text-white mr-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4"
        >
          Twórz
        </NuxtLink>
        <NuxtLink v-if="isLoggedIn" to="/generations" class="text-sm mr-4">Ostatnie wizualizacje</NuxtLink>
        <NuxtLink v-if="isLoggedIn" to="/cennik" class="text-sm mr-4">Cennik</NuxtLink>
        <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-64' }" v-if="isLoggedIn">
          <UAvatar icon="i-heroicons-user" alt="Avatar" />
          <template #account="{ item }">
            <div class="text-left">
              <p>Zalogowany jako</p>
              <p class="font-medium text-gray-900 dark:text-white">{{ item.label }}</p>
            </div>
          </template>
          <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>
            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" dynamic/>
          </template>
        </UDropdown>
      </div>
      <MobileMenu :menu-items="items" v-if="isMobile" />
    </header>
  </div>
</template>
