<template>
  <div class="relative overflow-hidden bg-aquaBlue-500 w-full">
    <div class="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
      <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <div class="sm:max-w-lg">
          <h3 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {{ title }}
            <br />
            <span
              class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800"
            >{{ highlighted }}</span>
          </h3>

          <p
            class="mb-4 text-xl font-light tracking-tight text-white sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl"
            v-html="paragraph"
          />

          <NuxtLink v-if="isLoggedIn" to="/design">
            <UButton
              variant="solid"
              class="mt-4 font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4"
            >
              <UIcon width="24" height="24" name="fluent:paint-brush-arrow-down-24-filled" dynamic />
              Rozpocznij projekt
            </UButton>
          </NuxtLink>
          <NuxtLink v-else to="/login">
            <UButton
              variant="solid"
              class="mt-4 font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4"
            >
              <UIcon width="24" height="24" name="fluent:paint-brush-arrow-down-24-filled" dynamic />
              Rozpocznij projekt
            </UButton>
          </NuxtLink>
        </div>

        <div class="mt-10">
          <div
            aria-hidden="true"
            class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
          >
            <div
              class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8"
            >
              <div class="flex items-center space-x-6 lg:space-x-8">
                <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                  <div class="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                    <NuxtImg src="/mosaic/mosaic-1.webp" class="h-full w-full object-cover object-center" />
                  </div>
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <NuxtImg src="/mosaic/mosaic-2.webp" class="h-full w-full object-cover object-center" />
                  </div>
                </div>

                <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <NuxtImg src="/mosaic/mosaic-3.webp" class="h-full w-full object-cover object-center" />
                  </div>
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <NuxtImg src="/mosaic/mosaic-4.webp" class="h-full w-full object-cover object-center" />
                  </div>
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <NuxtImg src="/mosaic/mosaic-5.webp" class="h-full w-full object-cover object-center" />
                  </div>
                </div>

                <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <NuxtImg src="/mosaic/mosaic-6.webp" class="h-full w-full object-cover object-center" />
                  </div>
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <NuxtImg src="/mosaic/mosaic-7.webp" class="h-full w-full object-cover object-center" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
const { isLoggedIn, getUser } = useLoggedIn();
onMounted(async () => {
  await getUser();
});

const props = defineProps({
  title: {
    type: String,
    default: 'Pomocnik',
  },
  highlighted: {
    type: String,
    default: 'przedRemontowy',
  },
  paragraph: {
    type: String,
    default: `
      - Dzięki wizualizacjom, zobaczysz jak wybrane style, kolory i meble komponują się z Twoim pomieszczeniem
      - <span class="bg-sunsetOrange-500 font-semibold text-white leading-6">zanim podejmiesz ostateczną decyzję.</span><br/><br/>
      - W kilka sekund testujesz mnóstwo koncepcji, szukając tej, która najlepiej oddaje Twój gust i potrzeby.<br/><br/>
      - W prosty sposób, możesz <span class="bg-sunsetOrange-500 font-semibold text-white leading-6">przekazać swoją wizję ekipie remontowej lub projektantowi wnętrz</span>, eliminując ryzyko nieporozumień.
    `,
  },
});
</script>
