<template>
  <div class="w-full relative" @mouseup="handleMouseUp" @touchend="handleMouseUp">
    <div
      ref="sliderRef"
      class="relative overflow-hidden select-none shadow-2xl shadow-sunsetOrange-900"
      @mousemove="handleMove"
      @touchmove="handleMove"
      @mousedown="handleMouseDown"
      @touchstart="handleMouseDown"
      :style="containerStyle"
    >
      <!-- Podstawowe zdjęcie -->
      <img
        alt=""
        :src="images[0]"
        class="w-full h-full absolute inset-0"
        draggable="false"
      />

      <!-- Zdjęcie z nałożonym efektem -->
      <div
        class="absolute top-0 left-0 right-0 bottom-0 overflow-hidden"
        :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
      >
        <img
          alt=""
          :src="images[1]"
          class="w-full h-full absolute inset-0"
          draggable="false"
        />
      </div>

      <!-- Uchwyt suwaka -->
      <div
        class="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        :style="{ left: `calc(${sliderPosition}% - 1px)` }"
      >
        <div class="bg-white absolute rounded-full h-3 w-3 -left-1 top-1/2 transform -translate-y-1/2"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useMouse, useElementSize } from '@vueuse/core';

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
  isHome: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const sliderPosition = ref(50);
const isDragging = ref(false);
const sliderRef = ref(null);

const { x: mouseX, y: mouseY } = useMouse();
const { width: sliderWidth } = useElementSize(sliderRef);

const imageAspectRatio = ref(1);

const containerStyle = ref({});

const updateAspectRatio = () => {
  const img = new Image();
  img.onload = () => {
    imageAspectRatio.value = img.width / img.height;
    containerStyle.value = {
      aspectRatio: `${img.width} / ${img.height}`,
    };
  };
  img.src = props.images[0];
};

onMounted(() => {
  updateAspectRatio();
});

watch(() => props.images, () => {
  updateAspectRatio();
});

const handleMove = (event) => {
  if (!isDragging.value) return;

  let clientX;
  if (event.type.startsWith('touch')) {
    clientX = event.touches[0].clientX;
  } else {
    clientX = event.clientX;
  }

  const rect = sliderRef.value.getBoundingClientRect();
  const x = Math.max(0, Math.min(clientX - rect.left, sliderWidth.value));
  const percent = Math.max(0, Math.min((x / sliderWidth.value) * 100, 100));

  sliderPosition.value = percent;
};

const handleMouseDown = () => {
  isDragging.value = true;
};

const handleMouseUp = () => {
  isDragging.value = false;
};
</script>
