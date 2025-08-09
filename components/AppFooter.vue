<template>
  <footer class="bg-aquaBlue-500 mt-5 sm:mt-0">
    <div
      class="text-left items-baseline gap-2 bg-aquaBlue-500 px-4 flex flex-col flex-wrap md:flex-row justify-between mx-auto container max-w-6xl text-white text-base font-light tracking-tight sm:mt-5 sm:text-xl lg:text-lg py-8"
    >
      <div class="w-full md:w-auto">
        <div class="flex-col gap-3 font-semibold">
          <div class="flex justify-center md:justify-start gap-4 mb-4">
            <NuxtLink
              class="hover:opacity-25 transition-all"
              to="https://www.instagram.com/instantroom.pl/"
              external
              target="_blank"
              ><UIcon class="w-10 h-10" name="skill-icons:instagram" dynamic
            /></NuxtLink>
            <NuxtLink
              class="hover:opacity-25 transition-all"
              to="https://www.facebook.com/instantroompl"
              external
              target="_blank"
              ><UIcon class="w-10 h-10" dynamic name="logos:facebook"
            /></NuxtLink>
            <NuxtLink
              class="hover:opacity-25 transition-all"
              to="https://pl.pinterest.com/instantroompl/"
              external
              target="_blank"
              ><UIcon
                class="w-10 h-10 bg-white rounded-full"
                name="logos:pinterest"
                dynamic
            /></NuxtLink>
          </div>
          <div
            class="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start"
          >
            <NuxtLink
              class="hover:text-coolGray-200 transition-all"
              :to="links.terms"
              >{{ labels.terms }}</NuxtLink
            >
            <NuxtLink
              class="hover:text-coolGray-200 transition-all"
              :to="links.privacy"
              >{{ labels.privacy }}</NuxtLink
            >
            <NuxtLink
              class="hover:text-coolGray-200 transition-all"
              :to="links.info"
              >{{ labels.info }}</NuxtLink
            >
          </div>
        </div>
        <p class="text-center md:text-left">
          Created by instantroom.pl © 2024
        </p>
      </div>
      <div class="w-full md:w-auto text-center md:text-left">
        {{ labels.contactLine1 }}<br />
        {{ labels.contactLine2 }}
        <a class="font-semibold" href="mailto:team@instantroom.pl"
          >team@instantroom.pl</a
        >
      </div>
    </div>
  </footer>
</template>

<script setup>
import { legalLinks } from "~/configs/legal";

const { locale } = useI18n();
const links = computed(() => legalLinks[locale.value]);
const labels = computed(() =>
  locale.value === "pl"
    ? {
        terms: "Regulamin",
        privacy: "Polityka prywatności",
        info: "RODO",
        contactLine1: "Masz jakieś pytania lub sugestie?",
        contactLine2: "Skontaktuj się z nami:",
      }
    : {
        terms: "Terms of Service",
        privacy: "Privacy Policy",
        info: "GDPR",
        contactLine1: "Have any questions or suggestions?",
        contactLine2: "Contact us:",
      },
);
</script>
