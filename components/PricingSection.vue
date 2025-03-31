<template>
    <div class="mx-auto pt-14 lg:pt-24 lg:pb-24 px-3 max-w-6xl">
      <div class="mb-10">
        <div class="space-y-4">
          <span
            class="rounded-xl uppercase bg-sunsetOrange-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white"
          >
            {{ topBadge }}
          </span>
          <h1 class="text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">
            {{ heading }}
            <span
              class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800"
            >
              {{ highlighted }}
            </span>
          </h1>
          <p
            class="text-lg font-light tracking-tight text-black sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl"
          >
            {{ paragraph1 }}
            <span
              class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800"
            >
              {{ highlightedInline }}
            </span>
          </p>
          <p
            class="text-lg font-light tracking-tight text-black sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl"
          >
            {{ paragraph2 }}
          </p>
        </div>
      </div>
  
      <div class="flex flex-wrap items-center justify-center w-full text-center">
        <div class="w-full p-4 md:w-1/2">
          <div class="flex flex-col rounded-xl bg-white text-black pb-4 shadow-2xl">
            <div class="py-5 text-sunsetOrange-500 bg-white rounded-xl">
              <h3>{{ packageTitle }}</h3>
              <p class="text-5xl font-bold pb-0">
                {{ packagePrice }}<span class="text-2xl">zł</span>
              </p>
              <span
                class="rounded-xl uppercase bg-sunsetOrange-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white"
              >
                {{ packageBadge }}
              </span>
            </div>
            <div class="flex justify-center">
              <div
                class="py-5 text-black rounded-b font-light text-xl flex flex-col items-start text-left px-8"
              >
                <p v-for="(benefit, i) in benefits" :key="i">
                  <UIcon
                    width="24"
                    height="24"
                    class="text-aquaBlue-500 mr-4"
                    dynamic
                    name="mdi:tick-all"
                  />
                  {{ benefit }}
                </p>
              </div>
            </div>
            <UButton
              v-if="isLoggedIn"
              @click="navigate(stripeUrl)"
              variant="solid"
              class="mt-4 font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4 flex justify-center mx-8"
            >
              <UIcon width="24" height="24" name="mdi:cart-outline" dynamic />
              {{ buyButtonText }}
            </UButton>
            <NuxtLink
              v-else
              to="/login"
              variant="solid"
              class="mt-4 font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4 flex justify-center items-center gap-2 mx-8"
            >
              <UIcon width="20" height="20" name="mdi:cart-outline" dynamic />
              {{ loginButtonText }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    topBadge: {
      type: String,
      default: 'Aż 500 wizualizacji w ramach pakietu  – generuj tyle, ile potrzebujesz',
    },
    heading: {
      type: String,
      default: 'Pierwsze 3 wizualizacje',
    },
    highlighted: {
      type: String,
      default: 'masz za darmo!',
    },
    paragraph1: {
      type: String,
      default: 'Bez kruczków, bez karty. Wizualizacje generujesz',
    },
    highlightedInline: {
      type: String,
      default: 'natychmiast po zalogowaniu!',
    },
    paragraph2: {
      type: String,
      default: 'A gdy będziesz chcieć więcej – sięgnij po abonament.',
    },
    packageTitle: {
      type: String,
      default: 'Abonament (500 wizualizacji / mc)',
    },
    packagePrice: {
      type: String,
      default: '89,90',
    },
    packageBadge: {
      type: String,
      default: 'Nielimitowane wizualizacje',
    },
    benefits: {
      type: Array,
      default: () => [
        '17 groszy za wizualizację',
        'Brak znaków wodnych',
        'Możliwość użycia komercyjnego',
        'Twórz wiele wizualizacji jednocześnie',
        'Korzystaj bez limitu przez cały miesiąc',
      ],
    },
    stripeUrl: {
      type: String,
      default: 'https://buy.stripe.com/9AQ6pSbNq1bXcrSdQZ',
    },
    buyButtonText: {
      type: String,
      default: 'Kup pakiet',
    },
    loginButtonText: {
      type: String,
      default: 'Przejdź do logowania',
    },
  });
  
  const { isLoggedIn } = useLoggedIn();
  const user = useSupabaseUser();
  const navigate = (url) => {
    window.location.href = `${url}?client_reference_id=${user.value?.id}`;
  };
  </script>
  