<template>
<section class="bg-aquaBlue-500 mx-auto w-full px-4 dark:bg-sunsetOrange-800 dark:text-white pt-14 pb-24 lg:pt-24 lg:pb-32">
  <div class="flex items-center justify-center flex-col pb-10">
    <h2 class="text-3xl text-center lg:text-left font-bold tracking-tight text-white sm:text-4xl md:text-5xl">{{ t('testimonials.title.pre') }} <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">{{ t('testimonials.title.highlight') }} </span></h2>
<p class="text-xl text-center lg:text-left lg:text-2xl font-light text-white">{{ t('testimonials.subtitle') }}</p> 
</div>
  <div class="grid grid-cols-1 lg:grid-cols-5 lg:gap-5 w-full max-w-6xl mx-auto">
    <div
      class="mb-4 lg:mb-0 border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-2 flex flex-col justify-between">
      <div class="flex flex-col">
        <p class="text-xl lg:text-2xl font-semibold">{{ t('testimonials.cards.c1.title') }}</p>
        <p class="text-lg lg:text-xl mt-2 font-light mb-4">{{ t('testimonials.cards.c1.content') }}</p>
      </div>
      <div class="flex flex-col justify-center">
        <div class="flex flex-wrap flex-col items-center justify-center">
            <NuxtImg loading="lazy" src="avatars/avatar1.webp" alt="avatar 1" class="h-20 w-20 rounded-full"/>
            <p class="pt-2 text-lg font-normal">Lena</p>
        </div>
      </div>
    </div>
    <div
      class="mb-4 lg:mb-0 border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-3 flex flex-col justify-between">
      <div class="flex flex-col">
        <p class="text-xl lg:text-2xl font-semibold"> {{ t('testimonials.cards.c2.title') }}</p>
        <p class="text-lg lg:text-xl mt-2 font-light mb-4">{{ t('testimonials.cards.c2.content') }}</p>
      </div>
      <div class="flex flex-col items-center">
        <NuxtImg loading="lazy" src="avatars/avatar2.webp" alt="avatar 2" class="h-20 w-20 rounded-full"/>
        <p class="pt-2 text-lg font-normal">Klaudia</p>
      </div>
    </div>
    <div
      class="mb-4 lg:mb-0 border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-3 flex flex-col justify-between">
      <div class="flex flex-col">
        <p class="text-xl lg:text-2xl font-semibold">{{ t('testimonials.cards.c3.title') }}</p>
        <p class="text-lg lg:text-xl mt-2 font-light mb-4">{{ t('testimonials.cards.c3.content') }}</p>
      </div>
      <div class="flex flex-col items-center">
        <NuxtImg loading="lazy" src="avatars/avatar3.webp" alt="avatar 3" class="h-20 w-20 rounded-full"/>
        <p class="pt-2 text-lg font-normal">Piotr Wysocki</p>
      </div>
    </div>
    <div
      class="mb-4 lg:mb-0 border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-2 flex flex-col justify-between">
      <div class="flex flex-col">
        <p class="text-xl lg:text-2xl font-semibold">{{ t('testimonials.cards.c4.title') }}</p>
        <p class="text-lg lg:text-xl mt-2 font-light mb-4">{{ t('testimonials.cards.c4.content') }}</p>
      </div>
      <div class="flex flex-col items-center">
        <NuxtImg loading="lazy" src="avatars/avatar4.webp" alt="avatar 4" class="h-20 w-20 rounded-full"/>
        <p class="pt-2 text-lg font-normal">Nadia</p>
      </div>
    </div>
    <div
      class="mb-4 lg:mb-0 border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-2 flex flex-col justify-between">
      <div class="flex flex-col">
        <p class="text-xl lg:text-2xl font-semibold">{{ t('testimonials.cards.c5.title') }}</p>
        <p class="text-lg lg:text-xl mt-2 font-light mb-4">{{ t('testimonials.cards.c5.content') }}</p>
      </div>
      <div class="flex flex-col items-center">
        <NuxtImg loading="lazy" src="avatars/avatar-6.webp" alt="avatar 6" class="h-20 w-20 rounded-full"/>
        <p class="pt-2 text-lg font-normal">Maciek</p>
      </div>
    </div>
    <div
      class="mb-4 lg:mb-0 border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-3 flex flex-col justify-between">
      <div class="flex flex-col">
        <p class="text-xl lg:text-2xl font-semibold">{{ t('testimonials.cards.c6.title') }}</p>
        <p class="text-lg lg:text-xl mt-2 font-light mb-4">{{ t('testimonials.cards.c6.content') }}</p>
      </div>
      <div class="flex flex-col items-center">
        <NuxtImg loading="lazy" src="avatars/avatar-5.webp" alt="avatar 5" class="h-20 w-20 rounded-full"/>
        <p class="pt-2 text-lg font-normal">Karolina</p>
      </div>
    </div>
    <!-- <div
      class="border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-2 flex flex-col gap-y-10 justify-between">
      <div class="flex flex-col gap-y-3.5">
        <p class="text-2xl lg:text-3xl mt-6 font-semibold">Reliable service uptime</p>
        <p class="text-xl lg:text-2xl mt-6 font-light">Our service has consistently maintained high uptime,
          ensuring that our operations run smoothly without any disruptions.</p>
      </div>
      <div class="flex flex-col">
        <img src="https://randomuser.me/api/portraits/men/90.jpg" alt="avatar" class="h-10 w-10">
        <p class="pt-2 text-sm font-semibold">James White</p>
        <p class="text-sm font-medium text-slate-700/70 dark:text-gray-400">COO at XYZ Corporation</p>
      </div>
    </div>
    <div
      class="border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-3 flex flex-col gap-y-10 justify-between">
      <div class="flex flex-col gap-y-3.5">
        <p class="text-2xl lg:text-3xl mt-6 font-semibold">Seamless integration process</p>
        <p class="text-xl lg:text-2xl mt-6 font-light">Integrating our systems with our service was smooth
          and hassle-free. The support team guided us through every step of the process.</p>
      </div>
      <div class="flex flex-col">
        <img src="https://randomuser.me/api/portraits/women/90.jpg" alt="Jane Doe" class="h-10 w-10">
        <p class="pt-2 text-sm font-semibold">Sarah Brown</p>
        <p class="text-sm font-medium text-slate-700/70 dark:text-gray-400">CTO at XYZ Corporation</p>
      </div>
    </div> -->
  </div>
</section>
</template>

<script setup>
const { t } = useI18n();
</script>