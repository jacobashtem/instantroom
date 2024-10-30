<template>
    <p class="flex items-center my-0">
        <UIcon dynamic name="system-uicons:calendar-date" class="mr-3"/>
     {{formattedDate}}
    </p>
</template>

<script setup>
    const props = defineProps({
        date: {
            type: String,
            required: true
        }
    })
    const formattedDate = computed(()=> {
        return props.date.split(' ')[0]
    })
</script>