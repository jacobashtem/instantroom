<template>
    <div>
        <UButton label="Open" @click="isModal = true" class="rounded-lg text-center bg-sunsetOrange-500 transition-all hover:bg-sunsetOrange-700 py-3 w-full mx-auto">
            <UIcon class="w-8 h-8 mr-3" name="solar:gallery-wide-broken" dynamic></UIcon>
                Wgraj zdjęcie!
            </UButton>
            <UModal v-model="isModal" :ui="{container: 'items-center', width: ' min-w-[75vw]' }">
                <div class="flex flex-wrap md:flex-nowrap">
                    <div class="p-4 w-full md:w-auto flex flex-col items-center">
                        <h2 class="text-2xl font-semibold mb-4 text-center md:text-left">
                            <span class="text-sunsetOrange-500">Dodaj nowe </span> zdjęcie
                        </h2>
                        <UploadImage />
                    </div>
                    <div class="flex justify-between  p-4 w-full flex-col">
                        <h2 class="text-2xl font-semibold text-center md:text-left">
                            Lub użyj jednego z <span class="text-sunsetOrange-500">wgranych wcześniej </span> zdjęć.
                        </h2>
                        <div v-if="userUploadedPhotos.length" class="grid grid-cols-12  p-4 place-items-center gap-2">
                            <img @click="chosenImgHandler($event)" class="col-span-12 md:col-span-6 lg:col-span-4 hover:opacity-75 object-cover w-full max-h-36 cursor-pointer" v-for="item in userUploadedPhotos" :src="item" :key="item">
                        </div>
                </div>
            </div>
        </UModal>
    </div>
</template>

<script setup>
const isModal = useState("modal");
const isChosenImgSrc = useState("chosenImgSrc");
const userUploadedPhotos = useState("userUploadedPhotos");

const chosenImgHandler = (event) => {
    isChosenImgSrc.value = event.target.currentSrc;
    isModal.value = !isModal.value;
} 

</script>
