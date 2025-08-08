<template>
  <div>
    <HeroMain />
    <section class="flex items-center flex-col justify-between pt-0">
      <section
        class="mx-auto container max-w-6xl lg:scroll-pt-24 pt-14 lg:pb-14"
      >
        <div class="mx-auto px-4 lg:flex">
          <div class="sm:text-center lg:text-left lg:w-1/2">
            <h2 class="text-3xl lg:text-4xl xl:text-5xl font-bold leading-none">
              {{ t("home.promo.heading.pre") }}
              <span
                class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800"
                >{{ t("home.promo.heading.highlight") }}</span
              >
              {{ t("home.promo.heading.post") }}
            </h2>
            <p class="text-xl lg:text-2xl mt-6 font-light">
              {{ t("home.promo.paragraph1.pre") }}
              <span
                class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800"
                >{{ t("home.promo.paragraph1.highlight") }}</span
              >,
              {{ t("home.promo.paragraph1.post") }}
            </p>
            <p class="text-xl lg:text-2xl mt-6 font-light">
              {{ t("home.promo.paragraph2.pre") }}
              <span
                class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800"
                >{{ t("home.promo.paragraph2.highlight") }}</span
              >
              {{ t("home.promo.paragraph2.post") }}
            </p>
          </div>
          <div class="lg:w-1/2">
            <NuxtImg loading="lazy" src="/promo-img.webp" />
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
    <UModal
      v-if="showModal"
      v-model="showModal"
      :overlay="true"
      :transition="true"
      :ui="{ container: 'items-center' }"
      @close="closeFreeTokensGrantedModal"
    >
      <div class="flex px-4 py-8">
        <h3 class="text-xl font-semibold text-center md:text-left">
          {{ t("home.freeModal.grantedLine1") }}
          <span class="text-sunsetOrange-500 text-xl"
            >3 {{ t("home.freeModal.tokenWord") }}</span
          ><br />
          {{ t("home.freeModal.exchangeLine1") }}
          <span class="text-sunsetOrange-500 text-xl"
            >3 {{ t("home.freeModal.visualizationWord") }}</span
          >
        </h3>
      </div>
      <div class="mb-8 flex justify-between">
        <UButton
          label="Open"
          class="rounded-lg text-center bg-sunsetOrange-500 transition-all hover:bg-sunsetOrange-700 py-3 w-auto mx-auto flex justify-center"
          @click="handleModalClose"
        >
          {{ t("home.startVisualization") }}
          <UIcon
            width="24"
            height="24"
            name="fluent:paint-brush-arrow-down-24-filled"
            dynamic
          />
        </UButton>
      </div>
    </UModal>
  </div>
</template>
<script setup>
const { t } = useI18n();
const gtm = useGtm();
const router = useRouter();
const { showModal, closeFreeTokensGrantedModal } = useUserTokens();

const handleModalClose = async () => {
  await closeFreeTokensGrantedModal();
  router.push("/design");
};
onMounted(() => {
  gtm.trackView("Homepage", "/");
});
</script>
