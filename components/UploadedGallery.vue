<template>
    <div>
        <h3 class="text-xl mb-2 font-semibold text-coolGray-900">
            Use one of <span class="text-midnightBlue-500">your uploaded </span>images
        </h3>
        <UButton label="Open" @click="isOpen = true" class="rounded-lg text-center bg-midnightBlue-500 hover:bg-midnightBlue-700 py-3 w-full mx-auto">
            <UIcon class="w-8 h-8 mr-3" name="solar:gallery-wide-broken" dynamic></UIcon>
            Uploaded Images Library</UButton>
        <UModal v-model="isOpen" :transition="false" :ui="{ width: 'min-w-[50vw]' }">
            <h2 class="text-2xl p-4 font-semibold border-b border-sunsetOrange-500500">Your last <span class="text-sunsetOrange-500">9 uploaded </span> photos</h2>
            <div class="p-4 grid grid-cols-2 md:grid-cols-3 place-items-center gap-2">
                <img @click="chosenImgHandler($event)" class="hover:opacity-75 object-cover w-full max-h-44 cursor-pointer" v-for="item in items" :src="item" :key="item">
            </div>
        </UModal>
    </div>
</template>

<script setup>
const emit = defineEmits(['chosenImgSrc']);
const isOpen = ref(false);
const chosenImgSrc = ref('');
const chosenImgHandler = (event) => {
    console.log(event.target.currentSrc);
    chosenImgSrc.value = event.target.currentSrc;
    isOpen.value = !isOpen.value;
    emit('chosenImgSrc', chosenImgSrc.value);
} 
const props = defineProps({
    items: Array
});
</script>
