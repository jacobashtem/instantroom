<template>
<section class="w-full">
  <div class="max-w-xl p-6 mx-auto pt-14 pb-24 lg:pt-24 lg:pb-32 px-4 lg:max-w-6xl">
    <div>
      <h2 class="text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">Dlaczego
        <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">
            warto nas wybrać?
        </span>
        </h2>
      <p class="text-xl lg:text-2xl mt-6 font-light">Co wyróżnia Instantroom i czyni je wyjątkowym?</p>
    </div>
    <div class="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
      <div>
        <div class="mt-12 space-y-12">
          <div class="flex">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-12 h-12 rounded-md">
                <UIcon class="w-20 h-20  text-aquaBlue-500" name="game-icons:unicorn" dynamic></UIcon>
            </div>
            </div>
            <div class="ml-4">
              <h4 class="text-2xl lg:text-2xl font-medium leading">Każdy projekt jest wyjątkowy</h4>
              <p class="mt-4 text-lg font-light tracking-tight sm:mt-2 sm:text-xl lg:text-lg xl:text-2xl"> ...i dopasowany do Twoich potrzeb. Wizualizacje powstają <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">na podstawie Twojego pomieszczenia,</span> uwzględniając jego kształt i często modyfikując meble widoczne na zdjęciu.</p>
            </div>
          </div>
          <div class="flex">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-12 h-12 rounded-md">
                <UIcon class="w-20 h-20 text-aquaBlue-500" name="subway:mark" dynamic></UIcon>
            </div>
            </div>
            <div class="ml-4">
              <h4 class="text-2xl lg:text-2xl font-medium leading">Twoje wizualizacje nie będą posiadały znaku wodnego</h4>
              <p class="mt-4 text-lg font-light tracking-tight  sm:mt-2 sm:text-xl lg:text-lg xl:text-2xl">i możesz je wykorzystywać zarówno prywatnie, jak i komercyjnie.</p>
            </div>
          </div>
          <div class="flex">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-12 h-12 rounded-md">
                <UIcon class="w-20 h-20 text-aquaBlue-500" name="mdi:meditation" dynamic></UIcon>
            </div>
            </div>
            <div class="ml-4">
              <h4 class="text-2xl lg:text-2xl font-medium leading">Oszczędzaj czas i nerwy!</h4>
              <p class="mt-4 text-lg font-light tracking-tight  sm:mt-2 sm:text-xl lg:text-lg xl:text-2xl"> Jeśli masz dość przeszukiwania internetu w poszukiwaniu inspiracji remontowych, przeglądania setek stron i zdjęć, nasz AI Dekorator Wnętrz jest rozwiązaniem dla Ciebie! Nie trać więcej czasu — kilkoma kliknięciami zobaczysz, jak Twój salon wygląda w stylu boho, nowoczesnym lub glamour.</p>
            </div>
          </div>
          <div class="flex">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-12 h-12 rounded-md">
                <UIcon class="w-20 h-20 bg-white text-aquaBlue-500  rounded-full" name="tabler:coin-filled" dynamic></UIcon>
            </div>
            </div>
            <div class="ml-4">
              <h4 class="text-2xl lg:text-2xl font-medium leading">Pierwsze 3 wizualizacje są całkowicie darmowe!</h4>
              <p class="mt-4 ext-lg font-light tracking-tight sm:mt-2 sm:text-xl text-lg xl:text-2xl"><span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">Bez haczyków, bez płatności.</span> Jeśli spodoba Ci się nasze narzędzie, zachęcamy do zakupu tokenów!</p>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" class="mt-10 lg:mt-0">
        <NuxtImg loading="lazy" width="600" height="600" src="/about-us-promo-img.webp" class="mx-auto lg:ml-8" style="color:transparent"/>
      </div>
    </div>
  </div>
</section>

</template>