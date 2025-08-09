<template>
  <div class="mx-auto pt-14 lg:pt-24 lg:pb-24 px-3 max-w-6xl">
    <div class="mb-10">
      <div class="space-y-4">
        <span
          class="rounded-xl uppercase bg-sunsetOrange-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white"
        >
          {{ topBadgeText }}
        </span>
        <h1 class="text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">
          {{ headingPre }}
          <span
            class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800"
          >
            {{ headingHighlighted }}
          </span>
        </h1>
        <p class="text-lg font-light tracking-tight text-black sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl">
          {{ paragraph1Pre }}
          <span
            class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800"
          >
            {{ paragraph1Highlighted }}
          </span>
        </p>
        <p
          v-html="paragraph2Html"
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
            {{ alreadySubscribedText }}
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

    <p class="text-lg font-light tracking-tight text-black sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl text-left mt-12" v-html="footerText"></p>
  </div>
</template>

<script setup>
const { isSubscriptionActive } = useUserTokens()

const props = defineProps({
  topBadge: {
    type: String,
    default: '',
  },
  heading: {
    type: String,
    default: '',
  },
  highlighted: {
    type: String,
    default: '',
  },
  paragraph1: {
    type: String,
    default: '',
  },
  highlightedInline: {
    type: String,
    default: '',
  },
  paragraph2: {
    type: String,
    default: '',
  },
  buyButtonText: {
    type: String,
    default: '',
  },
  loginButtonText: {
    type: String,
    default: '',
  },
});

const { t } = useI18n();
const topBadgeText = computed(() => props.topBadge || t('pricing.topBadge'));
const headingPre = computed(() => props.heading || t('pricing.heading.pre'));
const headingHighlighted = computed(() => props.highlighted || t('pricing.heading.highlight'));
const paragraph1Pre = computed(() => props.paragraph1 || t('pricing.paragraph1.pre'));
const paragraph1Highlighted = computed(() => props.highlightedInline || t('pricing.paragraph1.highlight'));
const paragraph2Html = computed(() => props.paragraph2 || t('pricing.paragraph2'));
const buyButtonText = computed(() => props.buyButtonText || t('pricing.buyButtonText'));
const loginButtonText = computed(() => props.loginButtonText || t('pricing.loginButtonText'));
const alreadySubscribedText = computed(() => t('pricing.alreadySubscribed'));
const footerText = computed(() => t('pricing.footer'));

const packages = computed(() => [
  {
    title: t('pricing.packages.mini.title'),
    price: '24,90',
    badge: t('pricing.packages.mini.badge'),
    benefits: [t('pricing.packages.mini.b1'), t('pricing.packages.mini.b2')],
    stripeUrl: 'https://buy.stripe.com/6oE9C418M4o9bnO8wI',
  },
  {
    title: t('pricing.packages.pro.title'),
    price: '89,90',
    badge: t('pricing.packages.pro.badge'),
    benefits: [t('pricing.packages.pro.b1'), t('pricing.packages.pro.b2')],
    stripeUrl: 'https://buy.stripe.com/9AQ6pSbNq1bXcrSdQZ',
  },
  {
    title: t('pricing.packages.enterprise.title'),
    price: '119,00',
    badge: t('pricing.packages.enterprise.badge'),
    benefits: [t('pricing.packages.enterprise.b1'), t('pricing.packages.enterprise.b2')],
    stripeUrl: 'https://buy.stripe.com/5kAg0s04I7AlcrS9AK',
  },
]);

const { isLoggedIn } = useLoggedIn();
const user = useSupabaseUser();
const navigate = (url) => {
  window.location.href = `${url}?client_reference_id=${user.value?.id}`;
};
</script>
