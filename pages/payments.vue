<template>
    <section class="bg-aquaBlue-500">
        <div class="mx-auto pt-40 pb-40 px-3 my-3 container max-w-6xl">
            <div class="space-y-4">
                <div class="space-y-4">
                    <span
                        class="rounded-xl uppercase bg-sunsetOrange-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                        1 token = 1 wizalizacja
                    </span>
                    <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                        <span class="sm:text-6xl">
                        </span> Twój Nowy Wystrój  <span
                            class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">wnętrz</span>
                        <br>
                        na Wyciągnięcie Ręki
                    </h1>
                    <p class="text-base font-light tracking-tight text-white sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl">
                        Wybierz pakiet, który najlepiej odpowiada Twoim potrzebom, doładuj swoje konto tokenami, a następnie wykorzystaj je na profesjonalne wizualizacje swoich wnętrz. Dzięki naszej pomocy, Twoje przestrzenie nabiorą nowego, wyjątkowego charakteru!
                    </p>
                </div>
            </div>
            <div class="flex flex-wrap items-center justify-center w-full text-center">
                <!-- basic plan -->
                <div class="w-full p-4 md:w-1/2 lg:w-1/3">
                    <div class="flex flex-col rounded-xl bg-white  text-black pb-4 shadow-2xl">
                        <div class="py-5 text-sunsetOrange-500 bg-white rounded-xl">
                            <h3>Pakiet podstawowy</h3>
                            <p class="text-5xl font-bold pb-0">
                                19.90<span class="text-2xl">zł</span>
                            </p>
                            <span
                        class="rounded-xl uppercase bg-sunsetOrange-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                            30 tokenów
                        </span>
                            <p class="text-md uppercase"></p>
                        </div>
                        <div class="flex justify-center">
                            <div class="py-5 text-black rounded-b font-light text-xl flex flex-col items-start">
                                <p><UIcon  width="24" height="24" class="text-aquaBlue-500 mr-4" dynamic name="mdi:tick-all"/>66 groszy za wizualizację!</p>
                                <p><UIcon  width="24" height="24" class="text-aquaBlue-500 mr-4" dynamic name="mdi:tick-all"/>Another feature plan feature</p>
                                <p><UIcon  width="24" height="24" class="text-aquaBlue-500 mr-4" dynamic name="mdi:tick-all"/>Yet another plan feature</p>
                            </div>
                        </div>
                        <UButton variant="solid" class="mt-4 focus:shadow-outline focus:outline-nonetracking-wide font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4 flex justify-center mx-8">
                            <UIcon width="24" height="24" name="mdi:cart-outline" dynamic /> Kup pakiet
                        </UButton>
                    </div>
                </div>
                <!-- standard plan -->
                <div class="w-full p-4 md:w-1/2 lg:w-1/3">
                    <div class="flex flex-col rounded-xl border-2 border-midnightBlue-500 bg-midnightBlue-500 pb-4">
                        <div class="py-5 text-sunsetOrange-500 bg-white">
                            <h3>Pakiet rozszerzony</h3>
                            <p class="text-5xl font-bold">
                                39.90<span class="text-2xl">zł</span>
                            </p>
                                80 tokenów
                        </div>
                        <div class="py-5 bg-midnightBlue-500 text-white rounded-b">
                            <p>~ 50 gr za wizualizację!</p>
                            <p>Another feature plan feature</p>
                            <p>Yet another plan feature</p>
                        </div>
                        <UButton variant="solid" class="mt-4 focus:shadow-outline focus:outline-nonetracking-wide font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-xl transition-all duration-300 ease-in-out text-lg px-4 flex justify-center mx-8">
                            <UIcon width="24" height="24" name="mdi:cart-outline" dynamic /> Kup pakiet
                        </UButton>
                    </div>
                </div>
                <!-- Luxury plan -->
                <div class="w-full p-4 md:w-1/2 lg:w-1/3">
                    <div class="flex flex-col rounded-xl border-2 border-midnightBlue-500 bg-midnightBlue-500 pb-4">
                        <div class="py-5 text-sunsetOrange-500 bg-white">
                            <h3>Pakiet luksusowy</h3>
                            <p class="text-5xl font-bold">
                                79.90<span class="text-2xl">zł</span>
                            </p>
                                200 tokenów
                        </div>
                        <div class="py-5 bg-midnightBlue-500 text-white rounded-b">
                            <p>~ 40 gr za wizualiację!</p>
                            <p>Another feature plan feature</p>
                            <p>Yet another plan feature</p>
                        </div>
                        <UButton variant="solid" class="mt-4 focus:shadow-outline focus:outline-nonetracking-wide font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-xl transition-all duration-300 ease-in-out text-lg px-4 flex justify-center mx-8">
                            <UIcon width="24" height="24" name="mdi:cart-outline" dynamic /> Kup pakiet
                        </UButton>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>

</script>