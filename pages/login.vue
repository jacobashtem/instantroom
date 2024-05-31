<template>
  <div class="min-h-[80vh] flex justify-center">
    <div
      class="max-w-screen-xl m-0  bg-white shadow sm:rounded-lg flex justify-center flex-1"
    >
      <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div>
          <h1 class="text-6xl font-bold mb-2">Instantroom</h1>
          <h2 class="text-2xl text-center">Your private <span class="text-sunsetOrange-500 font-semibold">Interior Decorator</span>. Dream up, your dream room.</h2>
          
        </div>
        <div class="mt-12 flex flex-col items-center">
          <h1  class="text-customDarkRed-500 text-2xl xl:text-xl font-extrabold text-left">Log in</h1>
          <div class="w-full flex-1 mt-8">
            <div class="flex flex-col items-center">
              <AuthGoogle />
              <AuthMagicLink/>
            </div>
            <SignupForm/>
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
useRedirectIfAuthenticated();

</script>