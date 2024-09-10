<template>
    <section class="bg-aquaBlue-500 h-full">
        <div class="mx-auto pt-40 pb-40 px-3 my-3 container max-w-6xl">
            <div class="mb-10">
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
                <div class="w-full p-4 md:w-1/2 lg:w-1/3">
                    <div class="flex flex-col rounded-xl bg-white  text-black pb-4 shadow-2xl">
                        <div class="py-5 text-sunsetOrange-500 bg-white rounded-xl">
                            <h3>Pakiet podstawowy</h3>
                            <p class="text-5xl font-bold pb-0">
                                17,90<span class="text-2xl">zł</span>
                            </p>
                            <span
                        class="rounded-xl uppercase bg-sunsetOrange-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                            30 tokenów
                        </span>
                            <p class="text-md uppercase"></p>
                        </div>
                        <div class="flex justify-center">
                            <div class="py-5 text-black rounded-b font-light text-xl flex flex-col items-start text-left px-8">
                                <p><UIcon  width="24" height="24" class="text-aquaBlue-500 mr-4" dynamic name="mdi:tick-all"/>0,6 zł za wizualizację!</p>
                                <p><UIcon  width="24" height="24" class="text-aquaBlue-500 mr-4" dynamic name="mdi:tick-all"/>Brak znaków wodnych</p>
                                <p><UIcon  width="24" height="24" class="text-aquaBlue-500 mr-4" dynamic name="mdi:tick-all"/>Możesz wykorzystywać wizualizacje komercyjnie</p>
                                <p><UIcon  width="24" height="24" class="text-aquaBlue-500 mr-4" dynamic name="mdi:tick-all"/>Twórz kilka wizualizacji jednocześnie!</p>
                            </div>
                        </div>
                        <!-- <NuxtLink to=""> -->
                            <UButton @click="navigate(`https://buy.stripe.com/aEUbKc9Fi07TeA0aEH?client_reference_id=${user?.id}`)" variant="solid" class="mt-4 focus:shadow-outline focus:outline-nonetracking-wide font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4 flex justify-center mx-8">
                                <UIcon width="24" height="24" name="mdi:cart-outline" dynamic /> Kup pakiet
                            </UButton>
                            
                        <!-- </NuxtLink> -->
                    </div>
                </div>
                <!-- standard plan -->
                <div class="w-full p-4 md:w-1/2 lg:w-1/3">
                    <div class="flex flex-col rounded-xl bg-white  text-black pb-4 shadow-2xl">
                        <div class="py-5 text-sunsetOrange-500 bg-white rounded-xl">
                            <h3>Pakiet rozszerzony</h3>
                            <p class="text-5xl font-bold pb-0">
                                39,90<span class="text-2xl">zł</span>
                            </p>
                            <span
                        class="rounded-xl uppercase bg-sunsetOrange-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                            80 tokenów
                        </span>
                            <p class="text-md uppercase"></p>
                        </div>
                        <div class="flex justify-center">
                            <div class="py-5 text-black rounded-b font-light text-xl flex flex-col items-start text-left px-8">
                                <p><UIcon  width="24" height="24" class="text-aquaBlue-500 mr-4" dynamic name="mdi:tick-all"/>0,5 zł za wizualizację!</p>
                                <p><UIcon  width="24" height="24" class="text-aquaBlue-500 mr-4" dynamic name="mdi:tick-all"/>Brak znaków wodnych</p>
                                <p><UIcon  width="24" height="24" class="text-aquaBlue-500 mr-4" dynamic name="mdi:tick-all"/>Możesz wykorzystywać wizualizacje komercyjnie</p>
                                <p><UIcon  width="24" height="24" class="text-aquaBlue-500 mr-4" dynamic name="mdi:tick-all"/>Twórz kilka wizualizacji jednocześnie!</p>
                            </div>
                        </div>
                        <UButton @click="navigate(`https://buy.stripe.com/00g4hKeZC07TfE43ce?client_reference_id=${user?.id}`)" variant="solid" class="mt-4 focus:shadow-outline focus:outline-nonetracking-wide font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4 flex justify-center mx-8">
                            <UIcon width="24" height="24" name="mdi:cart-outline" dynamic /> Kup pakiet
                        </UButton>                           
                    </div>
                </div>
                <!-- Luxury plan -->
                <div class="w-full p-4 md:w-1/2 lg:w-1/3">
                    <div class="flex flex-col rounded-xl bg-white  text-black pb-4 shadow-2xl">
                        <div class="py-5 text-sunsetOrange-500 bg-white rounded-xl">
                            <h3>Pakiet lux</h3>
                            <p class="text-5xl font-bold pb-0">
                                79,90<span class="text-2xl">zł</span>
                            </p>
                            <span
                        class="rounded-xl uppercase bg-sunsetOrange-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                            200 tokenów
                        </span>
                            <p class="text-md uppercase"></p>
                        </div>
                        <div class="flex justify-center">
                            <div class="py-5 text-black rounded-b font-light text-xl flex flex-col items-start text-left px-8">
                                <p><UIcon  width="24" height="24" class="text-aquaBlue-500 mr-4" dynamic name="mdi:tick-all"/>0,4zł za wizualizację!</p>
                                <p><UIcon  width="24" height="24" class="text-aquaBlue-500 mr-4" dynamic name="mdi:tick-all"/>Brak znaków wodnych</p>
                                <p><UIcon  width="24" height="24" class="text-aquaBlue-500 mr-4" dynamic name="mdi:tick-all"/>Możesz wykorzystywać wizualizacje komercyjnie</p>
                                <p><UIcon  width="24" height="24" class="text-aquaBlue-500 mr-4" dynamic name="mdi:tick-all"/>Twórz kilka wizualizacji jednocześnie!</p>
                            </div>
                        </div>
                        <UButton @click="navigate(`https://buy.stripe.com/bIY15y7xa3k563u145?client_reference_id=${user?.id}`)" variant="solid" class="mt-4 focus:shadow-outline focus:outline-nonetracking-wide font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4 flex justify-center mx-8">
                            <UIcon width="24" height="24" name="mdi:cart-outline" dynamic /> Kup pakiet
                        </UButton>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
    const user = useSupabaseUser();
    const router = useRouter();
    definePageMeta({
    middleware: ["auth"]
    })
    const navigate = (url) => {
        window.location.href = url;
    };
</script>