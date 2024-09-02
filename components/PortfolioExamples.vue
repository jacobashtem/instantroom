<template>
  <section id="portfolio" class="portfolio-section pt-14 pb:24 lg:pt-24 lg:pb-32 px-4 w-full max-w-6xl">
    <div class="mx-auto w-full">
      <!-- Tytuł sekcji -->
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl xl:text-5xl font-bold leading-none mb-4">Przykładowe
          <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">wizualizacje</span>
        </h2>
        <p class="text-xl lg:text-2xl mt-3 font-light">Przygotuj się na remont bez stresu – z Instant Room masz wszystko pod kontrolą, a do tego odrobinę rozrywki na deser!</p>
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
        <div v-for="(project, index) in visibleProjects" :key="index"
             class="group portfolio-item relative hover:shadow-lg shadow-md rounded-lg overflow-hidden"
             @click="openModal(project)">
          <NuxtImg :src="project.image" :alt="generateTitleFromFilename(project.image)" class="w-full h-60 object-cover cursor-pointer" />
          <div class="p-4 flex flex-col items-center justify-between relative z-10">
            <h3 class="text-lg font-medium text-txt group-hover:text-gray-dark">
              {{ generateTitleFromFilename(project.image) }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Przycisk Wczytaj więcej -->
      <div class="text-center mt-8 mb-4 lg:mb-0" v-if="hasMoreProjects">
        <UButton @click="loadMoreProjects" variant="solid" class="focus:shadow-outline focus:outline-none tracking-wide font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4">
          <UIcon width="24" height="24" :name="'mdi:chevron-double-down'" dynamic />
          Wczytaj więcej
        </UButton>
      </div>
    </div>

    <!-- Modal -->
    <UModal :ui="{
      width: 'w-full max-w-6xl lg:max-w-3xl',
      height: '',
      container: 'items-center'
    }" v-model="isModalOpen" :persistent="true" class="!max-h-3">
      <template #default>
        <NuxtImg :src="selectedProject?.image" :alt="selectedProject?.title" class="relative w-full object-cover" />
        <UIcon @click="isModalOpen = false" class="text-white hover:scale-110 transition-all cursor-pointer absolute top-8 right-0 transform -translate-x-1/2 -translate-y-1/2" width="36" height="36" name="material-symbols-light:close" dynamic />
      </template>
      <template #footer></template>
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

const { data, pending, error } = useFetch('/api/projects');

const projects = computed(() => data.value?.projects || []);
const categories = computed(() => data.value?.categories || []);

const activeCategory = ref('Salon');
const visibleProjectsCount = ref(6); 
const generateTitleFromFilename = (filename) => {
  const fileNameWithoutPath = filename.split('/').pop();
  const parts = fileNameWithoutPath
    .replace(/\.\w+$/, '')
    .split('-');
  return parts.slice(-1)[0].charAt(0).toUpperCase() + parts.slice(-1)[0].slice(1);
};

const filteredProjects = computed(() => {
  if (activeCategory.value === 'Wszystkie') {
    return projects.value;
  }
  return projects.value.filter((project) =>
    project.category.includes(activeCategory.value)
  );
});

const visibleProjects = computed(() => {
  return filteredProjects.value.slice(0, visibleProjectsCount.value);
});

const hasMoreProjects = computed(() => {
  return visibleProjectsCount.value < filteredProjects.value.length;
});

const loadMoreProjects = () => {
  if (hasMoreProjects.value) {
    visibleProjectsCount.value += 6;
  }
};


const setActiveCategory = (category) => {
  activeCategory.value = category;
};


watch(activeCategory, () => {
  visibleProjectsCount.value = 6;
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
