<template>
    <UCard>
        <template #header>
            Trwa logowanie...
        </template>
    </UCard>
</template>

<script setup>
 useRedirectIfAuthenticated()
</script>