<template>
  <HeroMain />
  <section class="flex items-center flex-col justify-between pt-0">
    <section class="mx-auto container max-w-6xl lg:scroll-pt-24 pt-14 lg:pb-14">
      <div class="mx-auto px-4 lg:flex">
        <div class="sm:text-center lg:text-left lg:w-1/2">
          <h2 class="text-3xl lg:text-4xl xl:text-5xl font-bold leading-none">
            AI Room Design -
            <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">przeprojektuj</span>
            swój dom za pomocą AI!
          </h2>
          <p class="text-xl lg:text-2xl mt-6 font-light">
            Instant Room to <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">pierwsze polskie narzędzie AI</span>,
            które pomoże Ci w przeprojektowaniu domu lub mieszkania według Twojej wizji.
          </p>
          <p class="text-xl lg:text-2xl mt-6 font-light">
            Bez względu na to, czy marzysz o elegancji lat 20-tych, rustykalnym uroku czy może odważnym stylu Barbie – nasz AI Room Generator
            <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">przemebluje Twoją przestrzeń </span>
            nie do poznania!
          </p>
        </div>
        <div class="lg:w-1/2">
          <NuxtImg src="/promo-img.webp" />
        </div>
      </div>
    </section>
    <HowItWorks />
    <PortfolioExamples />
    <BgCta />
    <AboutFeatures />
    <MosaicSection />
    <ComparisonSection />
    <div class="w-full">
      <AppTestimonials />
    </div>
    <div class="w-full">
      <PricingSection />
    </div>
    <div class="w-full">
      <FaqList />
    </div>
  </section>
  <UModal v-if="showModal" @close="closeFreeTokensGrantedModal" :overlay="true" v-model="showModal" :transition="true" :ui="{ container: 'items-center' }">
    <div class="flex px-4 py-8">
      <h3 class="text-xl font-semibold text-center md:text-left">
        Właśnie przyznaliśmy Ci
        <span class="text-sunsetOrange-500 text-xl">5 tokenów.</span><br />
        Możesz je zamienić na
        <span class="text-sunsetOrange-500 text-xl">5 wizualizacji!</span>
      </h3>
    </div>
    <div class="mb-8 flex justify-between">
      <UButton @click="handleModalClose" label="Open" class="rounded-lg text-center bg-sunsetOrange-500 transition-all hover:bg-sunsetOrange-700 py-3 w-auto mx-auto flex justify-center">
        Rozpocznij wizualizacje
        <UIcon width="24" height="24" name="fluent:paint-brush-arrow-down-24-filled" dynamic />
      </UButton>
    </div>
  </UModal>
</template>
<script setup>
const gtm = useGtm();
const router = useRouter();
const { showModal, closeFreeTokensGrantedModal } = useUserTokens();

const handleModalClose = async () => {
  await closeFreeTokensGrantedModal();
  router.push('/design');
};
onMounted(() => {
  gtm.trackView('Homepage', '/');
});
</script>