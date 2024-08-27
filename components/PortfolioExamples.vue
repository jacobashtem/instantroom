<template>
    <section id="portfolio" class="portfolio-section py-16 px-4 w-full max-w-6xl">
        <div class="mx-auto w-full">
            <!-- Tytuł sekcji -->
            <div class="text-center mb-12">
                <h2 class="text-3xl lg:text-4xl xl:text-5xl font-bold leading-none mb-4">Przykładowe
                    <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">realizacje</span>
                </h2>
                <p class="text-xl lg:text-2xl mt-3 font-light">Niech Twoje wnętrza odzwierciedlają Twoją osobowość! Ogranicza Cię tylko wyobraźnia.</p>
            </div>

            <!-- Przyciski filtrów -->
            <div class="flex flex-wrap md:flex-row items-center mb-8 gap-3 justify-center">
                <button v-for="category in categories" :key="category" @click="setActiveCategory(category)" :class="{
                    'bg-aquaBlue-500 text-white': activeCategory === category,
                    'bg-sunsetOrange-500 text-gray-800': activeCategory !== category
                }" class="filter-button px-4 py-3 mr-2 mb-2 rounded-full text-white text-xl transition-all hover:bg-aquaBlue-500">
                    {{ category }}
                </button>
            </div>

            <!-- Lista projektów -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div v-for="(project, index) in filteredProjects" :key="index"
                    class="group portfolio-item relative hover:shadow-lg shadow-md rounded-lg overflow-hidden"
                    @click="openModal(project)">
                    <NuxtImg :src="project.image" :alt="project.title" class="w-full h-60 object-cover cursor-pointer" />
                    <div class="p-4 flex flex-col items-center justify-between relative z-10">
                        <h3 class="text-lg font-medium text-txt group-hover:text-gray-dark">
                            {{ project.title }}
                        </h3>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <UModal :ui="{
          width: 'w-full max-w-6xl lg:max-w-3xl',
          height: '',
          container: 'items-center'
        }"  v-model="isModalOpen" :persistent="true" class="!max-h-3">
            <template #default>
                <NuxtImg :src="selectedProject?.image" :alt="selectedProject?.title" class="relative w-full object-cover" />
                <UIcon
            @click="isModalOpen = false"
            class="text-white hover:scale-110 transition-all cursor-pointer absolute top-8 right-0 transform -translate-x-1/2 -translate-y-1/2"
            width="36"
            height="36"
            name="material-symbols-light:close"
            dynamic
          />
            </template>
            <template #footer>

            </template>
        </UModal>
    </section>
</template>

<script setup>
const isModalOpen = ref(false);
const selectedProject = ref(null);

const openModal = (project) => {
    selectedProject.value = project;
    isModalOpen.value = true;
};

const projects = ref([
    {
        title: 'Rustykalny',
        category: 'Salon',
        image: '/portfolio/living-room/rustykalny-1.webp',
    },
    {
        title: 'Rustykalny',
        category: 'Salon',
        image: '/portfolio/living-room/boho-1.webp',
    },
    {
        title: 'Tiffany',
        category: 'Salon',
        image: '/portfolio/living-room/tiffany-1.webp',
    },
    {
        title: 'Glamour',
        category: 'Biuro',
        image: '/portfolio/office/office-1.webp',
    },
    {
        title: 'Rainbow unicorn',
        category: 'Biuro',
        image: '/portfolio/office/office-2.webp',
    },
    {
        title: 'Klasyczny',
        category: 'Biuro',
        image: '/portfolio/office/office-3.webp',
    },
    {
        title: 'Klasyczny',
        category: 'Taras',
        image: '/portfolio/terrace/terrace-1.webp',
    },
    {
        title: 'Wielki Gatsby',
        category: 'Taras',
        image: '/portfolio/terrace/terrace-2.webp',
    },
    {
        title: 'Egzotyczny',
        category: 'Taras',
        image: '/portfolio/terrace/terrace-3.webp',
    },
]);

// Kategorie do filtrowania
const categories = ref(['Wszystkie', 'Salon', 'Sypialnia', 'Łazienka', 'Kuchnia', 'Taras', 'Jadalnia', 'Biuro']);

// Aktywna kategoria
const activeCategory = ref('Salon');

// Funkcja ustawiająca aktywną kategorię
const setActiveCategory = (category) => {
    activeCategory.value = category;
};

// Filtrowanie projektów na podstawie aktywnej kategorii
const filteredProjects = computed(() => {
    if (activeCategory.value === 'Wszystkie') {
        return projects.value;
    }
    return projects.value.filter((project) =>
        project.category.includes(activeCategory.value)
    );
});
</script>

<style scoped>
.filter-button {
    cursor: pointer;
}

.portfolio-item {
    position: relative;
    transition: transform 0.3s ease;
}

.portfolio-item:hover {
    transform: scale(1.05);
}
</style>
