<template>
    <HeroMain/>
    <section class="flex items-center flex-col justify-between mb-10">
      <div class="w-full items-center flex-col  lg:flex-row container max-w-full xl:max-w-7xl mx-auto justify-between flex mb-12">
      <h1 class="text-4xl font-extrabold my-12 pr-12 lg:mb-0 text-black-500">
        Stwórz swoje wizualizacje w kilka sekund! 
      </h1>
    </div>
    <!-- <HowItWorks />
      <PortfolioExamples /> -->
      <div>
      </div>
    </section>
    <UModal v-if="showModal" :overlay="true" v-model="freeTokensGrantedModal" :transition="true" :ui="{container: 'items-center'}">
                <div class="flex px-4 py-8">
                    <h3 class="text-xl font-semibold text-center md:text-left">
                        Właśnie przyznaliśmy Ci 
                        <span class="text-sunsetOrange-500 text-xl">5 tokenów.</span><br/>
                        Możesz je zamienić je na 
                        <span class="text-sunsetOrange-500 text-xl">5 wizualizacji! </span>
                    </h3>
                </div>
                <div class="mb-8 flex justify-between">
                    <UButton @click="closeFreeTokensGrantedModal(); navigateTo('/design')"  label="Open"  class="rounded-lg text-center bg-sunsetOrange-500 transition-all hover:bg-sunsetOrange-700 py-3 w-auto mx-auto flex justify-center">
                        Rozpocznij wizualizacje<UIcon width="24" height="24" name="fluent:paint-brush-arrow-down-24-filled" dynamic />
                    </UButton>
                </div>
            </UModal>
  </template>
  <script setup>
const gtm = useGtm();
const { showModal, closeFreeTokensGrantedModal } = useUserTokens();
const freeTokensGrantedModal = ref(true);
onMounted(() => {
  gtm.trackView("Homepage", "/");
});
  </script>