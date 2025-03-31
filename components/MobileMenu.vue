<template>
    <div>
        <button class="absolute top-4 right-4 block lg:hidden" @click="toggleMenu">
            <UIcon class="w-8 h-8" width="36" height="36" name="ci:hamburger-md" dynamic />
        </button>
        <transition name="slide" mode="out-in">
            <div v-if="isMenuOpen" ref="menuRef"
                class="lg:hidden absolute top-0 right-0 z-30  text-white w-full h-screen px-8 bg-sunsetOrange-500">
                <button class="absolute top-8 right-4" @click="toggleMenu">
                    <UIcon class="w-8 h-8" width="36" height="36" name="ci:close-md" dynamic />
                </button>
                <p class="text-6xl xs:text-8xl font-bold bulgariamoderna flex flex-col pt-8 pb-0 text-white">
                    Instant<span class="text-3xl">Room!</span>
                </p>
                <div data-v-3024d910="" class="pt-8 mt-8 border-t flex right-0 relative">
                    <div class="flex justify-between md:justify-between w-full absolute -top-5">
                        <NuxtLink class="hover:opacity-25 transition-all" to="https://www.instagram.com/instantroom.pl/" external target="_blank"><UIcon class="w-10 h-10" name="skill-icons:instagram" dynamic /></NuxtLink>
                        <NuxtLink class="hover:opacity-25 transition-all" to="https://www.facebook.com/instantroompl" external target="_blank"><UIcon class="w-10 h-10" dynamic name="logos:facebook" /></NuxtLink>
                        <NuxtLink class="hover:opacity-25 transition-all" to="https://pl.pinterest.com/instantroompl/" external target="_blank"><UIcon class="w-10 h-10 bg-white rounded-full" name="logos:pinterest" dynamic /></NuxtLink>
                    </div>
                </div>
                <ul class="text-xl mb-4 z-30">
                    <li class="py-3" @click="toggleMenu">
                        <NuxtLink v-if="!user" to="/login" class="font-semibold text-white flex items-center">
                            <UIcon name="mdi:user" class="mr-2 flex-shrink-0 h-8 w-8 text-white-400 dark:text-white" dynamic />
                            Logowanie / Rejestracja
                        </NuxtLink>
                    </li>
                    <li class="py-3" @click="toggleMenu">
                        <NuxtLink  to="/blog" class="font-semibold text-white flex items-center">
                            <UIcon name="material-symbols:article" class="mr-2 flex-shrink-0 h-8 w-8 text-white-400 dark:text-white" dynamic />
                            Blog
                        </NuxtLink>
                    </li>
                    <li class="py-3" @click="toggleMenu">
                        <NuxtLink  to="/oferta" class="font-semibold text-white flex items-center">
                            <UIcon name="ic:baseline-local-offer" class="mr-2 flex-shrink-0 h-8 w-8 text-white-400 dark:text-white" dynamic />Oferta
                        </NuxtLink>
                    </li>
                    <li class="py-3" @click="toggleMenu">
                        <NuxtLink v-if="user" to="/design" class="font-semibold text-white flex items-center">
                            <UIcon name="clarity:design-solid" class="mr-2 flex-shrink-0 h-8 w-8 text-white-400 dark:text-white" dynamic />
                            Twórz
                        </NuxtLink>
                    </li>
                    <li class="py-3" @click="toggleMenu">
                        <NuxtLink v-if="user" to="/generations" class=" text-white flex items-center">
                            <UIcon name="ic:round-image" class="mr-2 flex-shrink-0 h-8 w-8 text-white-400 dark:text-white" dynamic />
                            Ostatnie wizualizacje</NuxtLink>
                    </li>
                    <li class="py-3" @click="toggleMenu">
                        <NuxtLink v-if="user" to="/cennik" class=" text-white mr-4 flex items-center">
                            <UIcon name="i-heroicons-shopping-cart-solid" class="mr-2 flex-shrink-0 h-8 w-8 text-white-400 dark:text-white" dynamic />
                                Cennik
                        </NuxtLink>
                    </li>
                    <li @click="item.label !== 'Wyloguj'? toggleMenu() : logOut()" class="flex items-center py-3 text-white" v-for="item in menuItems[1]">
                        <NuxtLink v-if="user" :to="item.url" class="flex text-white mr-4 flex items-center">
                            <UIcon :name="item.icon" class="mr-4 flex-shrink-0 h-8 w-8 text-white-400 dark:text-white" />
                          {{ item.label }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script setup>
const props = defineProps({
    menuItems: {
        type: Array,
        default: () => []
    }
})
const supabase = useSupabaseClient()
const user = useSupabaseUser();
import { onClickOutside } from "@vueuse/core";
const menuRef = ref(null);
onClickOutside(menuRef, () => {
    isMenuOpen.value = false;
});
const isMenuOpen = ref(false);
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const logOut = async() => {
    await supabase.auth.signOut()
    const { data: { user: userData } } = await supabase.auth.getUser()
    useRedirectBasedOnAuth('/') 
    toggleMenu();
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}
</style>