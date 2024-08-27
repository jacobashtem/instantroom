<template>
    <div>
        <button class="absolute top-4 right-4 block lg:hidden" @click="toggleMenu">
            <UIcon width="36" height="36" name="ci:hamburger-md" dynamic />
        </button>
        <transition name="slide" mode="out-in">
            <div v-if="isMenuOpen" ref="menuRef"
                class="lg:hidden absolute top-0 right-0 z-30  text-white w-full h-screen px-8 bg-sunsetOrange-500">
                <button class="absolute top-8 right-4" @click="toggleMenu">
                    <UIcon width="36" height="36" name="ci:close-md" dynamic />
                </button>
                <p class="text-6xl xs:text-8xl font-bold bulgariamoderna flex flex-col pt-8 pb-0 text-white">
                    Instant<span class="text-3xl">Room!</span>
                </p>
                <div data-v-3024d910="" class="pt-8 mt-8 border-t flex right-0"></div>
                <ul class="text-xl mb-4 z-30">
                    <li class="py-3" @click="toggleMenu">
                        <NuxtLink v-if="!user" to="/login" class="font-semibold text-white">
                            <UIcon name="mdi:user" class="mr-2 flex-shrink-0 h-8 w-8 text-white-400 dark:text-white" dynamic />
                            Logowanie
                        </NuxtLink>
                    </li>
                    <li class="py-3" @click="toggleMenu">
                        <NuxtLink v-if="user" to="/design" class="font-semibold text-white  mr-4">
                            <UIcon name="clarity:design-solid" class="mr-2 flex-shrink-0 h-8 w-8 text-white-400 dark:text-white" dynamic />
                            Twórz
                        </NuxtLink>
                    </li>
                    <li class="py-3" @click="toggleMenu">
                        <NuxtLink v-if="user" to="/generations" class=" text-white">
                            <UIcon name="ic:round-image" class="mr-2 flex-shrink-0 h-8 w-8 text-white-400 dark:text-white" dynamic />
                            Ostatnie wizualizacje</NuxtLink>
                    </li>
                    <li class="py-3" @click="toggleMenu">
                        <NuxtLink v-if="user" to="/cennik" class=" text-white mr-4">
                            <UIcon name="material-symbols:money" class="mr-2 flex-shrink-0 h-8 w-8 text-white-400 dark:text-white" dynamic />
                                Cennik
                        </NuxtLink>
                    </li>
                    <li @click="item.label !== 'Wyloguj'? toggleMenu() : logOut()" class="flex items-center py-3 text-white" v-for="item in menuItems[1]">
                        <NuxtLink v-if="user" :to="item.url" class="flex text-white mr-4">
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