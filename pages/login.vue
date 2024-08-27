<template>
  <div class="min-h-[80vh] flex justify-center">
    <div
      class="max-w-screen-xl m-0  bg-white shadow sm:rounded-lg flex justify-center flex-1"
    >
      <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div class="mt-12 flex flex-col items-center">
          <h1  class="text-customDarkRed-500 text-2xl xl:text-xl font-extrabold text-left">Zaloguj się</h1>
          <p>Założenie konta oznacza akceptację <NuxtLink class="text-sunsetOrange-500" href="/regulamin">Regulaminu</NuxtLink  ></p>
          <div class="w-full flex-1 mt-8">
            <div class="flex flex-col items-center mb-8">
              <AuthGoogle />
              <AuthMagicLink/>
            </div>
            <div class="mb-4 border-b text-center">
            <div
              class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
              lub zarejestruj się za pomocą e-mail
            </div>
          </div>
            <SignupForm />
          </div>
        </div>
      </div>
      <div class="flex-1 bg-sunsetOrange-400 text-center hidden lg:flex">
        <div
          class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style="
            background-image: url('instant-room.png');
          "
        ></div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
const success = ref(false);
const pending = ref(false);

const { toastError } = useAppToast();
const supabase = useSupabaseClient();
useRedirectBasedOnAuth('/', '/login') 

</script>