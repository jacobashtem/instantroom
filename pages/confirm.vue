<template>
    <UCard>
        <template #header>
            Trwa logowanie...
        </template>
    </UCard>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})

const supabase = useSupabaseClient();
useRedirectBasedOnAuth()
</script>