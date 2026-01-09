<template>
  <PricingSection/>
</template>

<script setup>
const user = useSupabaseUser();
const navigate = (url) => {
  window.location.href = url;
};
</script>
