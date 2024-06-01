<template>
  <div class="h-[61vh] w-screen bg-aquaBlue-500 mb-48">
    <div class="mx-auto container pt-16 sm:pt-24">
        <div class="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
            <div class="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
                <div class="space-y-8">
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <span
                                class="rounded-full uppercase bg-sunsetOrange-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                               PROJEKTY WNĘTRZ ai
                            </span>
                            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                                <span class="sm:text-6xl">
                                </span> Zaprojektuj   <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">wnętrze</span>
                                <br>
                                w kilka sekund
                            </h1>
                        </div>

                        <p class="text-base font-light tracking-tight text-white sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl">
                          Szukasz ciekawego projektu wnętrz przed nadchodzącym remontem? Zainspiruj się wizualizacjami, stworzonymi na podstawie Twoich zdjęć. Wystarczy dodać obraz, wybrać rodzaj pomieszczenia oraz styl i... gotowe!
                        </p>

                    </div>

                    <!-- <div class="border-t border-coolGray-700"></div> -->
                </div>
            </div>

            <div class="flex items-center w-full col-span-6">
                <div class="px-6 h-96 lg:h-100% w-full col-span-12 flex items-center mx-auto">
                    <ComparisonSlider :images="images" />
                </div>
            </div>

        </div>
    </div>
</div>
</template>
<script setup>
  import img1 from '@/public/examples/before-image-2.webp';
  import img2 from '@/public/examples/after-image-2.webp';
  const images = [img1, img2]
</script>