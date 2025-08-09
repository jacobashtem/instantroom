<template>
    <UCard>
        <template #header>
            {{ t('confirm.loggingIn') }}
        </template>
    </UCard>
</template>

<script setup>
const { t } = useI18n();

definePageMeta({
  middleware: ["auth"]
})

const supabase = useSupabaseClient();
useRedirectBasedOnAuth()
</script>