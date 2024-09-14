<template>
    <footer class="bg-aquaBlue-500 mt-5 sm:mt-0">
        <div
            class="text-left items-baseline gap-2  bg-aquaBlue-500 px-4 flex flex-col flex-wrap md:flex-row justify-between  mx-auto container max-w-6xl text-white text-base font-light tracking-tight sm:mt-5 sm:text-xl lg:text-lg  py-8">
            <div class="w-full md:w-auto">
                <div class="flex-col gap-3 font-semibold">
                    <div class="flex justify-center md:justify-start gap-4 mb-4">
                        <NuxtLink class="hover:opacity-25 transition-all" to="https://www.instagram.com/instantroom.pl/" external target="_blank"><UIcon class="w-10 h-10" name="skill-icons:instagram" dynamic /></NuxtLink>
                        <NuxtLink class="hover:opacity-25 transition-all" to="https://www.facebook.com/instantroompl" external target="_blank"><UIcon class="w-10 h-10" dynamic name="logos:facebook" /></NuxtLink>
                        <NuxtLink class="hover:opacity-25 transition-all" to="https://pl.pinterest.com/instantroompl/" external target="_blank"><UIcon class="w-10 h-10 bg-white rounded-full" name="logos:pinterest" dynamic /></NuxtLink>
                    </div>
                    <div class="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
                        <NuxtLink class="hover:text-coolGray-200 transition-all" to="regulamin">Regulamin</NuxtLink>
                        <NuxtLink class="hover:text-coolGray-200 transition-all" to="polityka-prywatnosci">Polityka
                            prywatności</NuxtLink>
                        <NuxtLink class="hover:text-coolGray-200 transition-all" to="obowiazek-informacyjny">RODO</NuxtLink>
                    </div>
                </div>
                <p class="text-center md:text-left">Created by instantroom.pl © 2024</p>
            </div>
            <div class="w-full md:w-auto text-center md:text-left">Masz jakieś pytania lub sugestie?<br /> 
                Skontaktuj się z nami: <a class="font-semibold"
                    href="mailto:team@instantroom.pl">team@instantroom.pl</a></div>
        </div>
    </footer>
</template>
