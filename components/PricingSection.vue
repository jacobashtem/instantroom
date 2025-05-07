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
        <p class="text-lg font-light tracking-tight text-black sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl">
          {{ paragraph1 }}
          <span
            class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800"
          >
            {{ highlightedInline }}
          </span>
        </p>
        <p
          v-html="paragraph2"
          class="text-lg font-light tracking-tight text-black sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl"
        />
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-center w-full text-center">
      <div
        v-for="(pack, index) in packages"
        :key="index"
        class="w-full p-4 md:w-1/2 lg:w-1/4"
      >
        <div class="flex flex-col rounded-xl bg-white text-black pb-4 shadow-2xl">
          <div class="py-5 text-sunsetOrange-500 bg-white rounded-xl">
            <h3>{{ pack.title }}</h3>
            <p class="text-5xl font-bold pb-0">
              {{ pack.price }}<span class="text-2xl">zł</span>
            </p>
            <span
              class="rounded-xl uppercase bg-sunsetOrange-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white"
            >
              {{ pack.badge }}
            </span>
          </div>
          <div class="flex justify-center">
            <div
              class="py-5 text-black rounded-b font-light text-xl flex flex-col items-start text-left px-8"
            >
              <p v-for="(benefit, i) in pack.benefits" :key="i">
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
            v-if="isLoggedIn && !isSubscriptionActive"
            @click="navigate(pack.stripeUrl)"
            variant="solid"
            class="mt-4 font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4 flex justify-center mx-8"
          >
            <UIcon width="24" height="24" name="mdi:cart-outline" dynamic />
            {{ buyButtonText }}
          </UButton>
          <div
            v-else-if="isLoggedIn && isSubscriptionActive"
            variant="solid"
            class="mt-4 font-semibold py-4 rounded-lg text-lg px-4 flex justify-center mx-8"
          >
            Masz już aktywną subskrypcję
        </div>
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

    <p class="text-lg font-light tracking-tight text-black sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl text-left mt-12">
      Przygotowujesz mieszkanie do sprzedaży lub remontu? A może jesteś pośrednikiem albo prowadzisz agencję?
Jedna oferta to zwykle kilka pomieszczeń i wiele zdjęć – a każde warto pokazać w różnych stylach.
      <span class="bg-sunsetOrange-500 font-semibold text-white leading-6">
        Dzięki pakietom wygenerujesz dziesiątki wariantów, co wystarczy na obsługę od kilku do kilkudziesięciu mieszkań. 
      </span>,
      Twoje ogłoszenia od razu zyskają na atrakcyjności.
    </p>
  </div>
</template>

<script setup>
const { isSubscriptionActive } = useUserTokens()

const props = defineProps({
  topBadge: {
    type: String,
    default: 'Nawet 1500 wizualizacji w ramach pakietu  – generuj tyle, ile potrzebujesz',
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
    default:
      'A gdy będziesz chcieć więcej – sięgnij po abonament.<span class="bg-sunsetOrange-500 font-semibold text-white leading-6"> Nasza rada: Wygeneruj 5–8 aranżacji na jedno zdjęcie – dzięki temu z łatwością znajdziesz styl, który naprawdę Cię przekona. </span> Nawet przy ograniczeniach AI taka różnorodność pozwala niemal zawsze uzyskać wizualizację, która wyróżni wnętrze i podkreśli jego potencjał.',
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

const packages = [
  {
    title: 'Mini (30 wizualizacji)',
    price: '24,90',
    badge: 'Dla zabawy',
    benefits: [
      '86 groszy za wizualizację',
      'Idealne do zabawy lub dla 1-2 pomieszczeń',
    ],
    stripeUrl: 'https://buy.stripe.com/6oE9C418M4o9bnO8wI',
  },
//  {
//     title: 'Standard (100 wizualizacji)',
//     price: '59,90',
//     badge: 'Dla całego mieszkania',
//     benefits: [
//       '60 groszy za wizualizację',
//       'Idealne dla 1 mieszkania lub domu',
//     ],
//     stripeUrl: 'https://buy.stripe.com/7sI6pS18M4o99fG9AL',
//   }, 
  {
    title: 'Pro (500 wizualizacji)',
    price: '89,90',
    badge: 'Dla pośredników',
    benefits: [
      '17 groszy za wizualizację',
      'Idealne dla kilku/kilkunastu mieszkań',
    ],
    stripeUrl: 'https://buy.stripe.com/9AQ6pSbNq1bXcrSdQZ',
  },
  {
    title: 'Enterprise (1500 wizualizacji)',
    price: '119,00',
    badge: 'Dla agencji i zespołów',
    benefits: [
      '7 groszy za wizualizację',
      'Idealne dla kilkudziesięciu mieszkań',
    ],
    stripeUrl: 'https://buy.stripe.com/5kAg0s04I7AlcrS9AK',
  },
];

const { isLoggedIn } = useLoggedIn();
const user = useSupabaseUser();
const navigate = (url) => {
  window.location.href = `${url}?client_reference_id=${user.value?.id}`;
};
</script>
