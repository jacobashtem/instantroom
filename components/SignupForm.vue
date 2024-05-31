<template>
    <div class="my-12 border-b text-center">
        <div
            class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
            Or sign up in classical way
        </div>
    </div>
    <UForm :state="state" :schema="schema" class="mx-auto max-w-xs" @submit="registerWithEmail">
        <UFormGroup name="email" class="mb-4" :required="true">
            <UInput v-model="state.email"
                :inputClass="'mb-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'"
                type="email" placeholder="Email" required />
        </UFormGroup>
        <UFormGroup name="password" class="mb-4" :required="true"
            help="You will receive an email with the confirmation link">
            <UInput v-model="state.password"
                :inputClass="'mb-4 w-full px-8 py-4 rounded-lg font-medium text-sm w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-whitew-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'"
                type="password" placeholder="password" required />
        </UFormGroup>
        <UButton type="submit"
            class="mt-5 tracking-wide font-semibold bg-customDarkRed-500 text-gray-100 w-full py-4 rounded-lg hover:bg-customRed-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
            <UIcon width="24" height="24" name="ant-design:user-add-outlined" dynamic />
            <span class="ml-3"> Sign Up </span>
        </UButton>
        <p class="mt-6 text-xs text-gray-600 text-center">
            I agree to abide by templatana's
            <a href="#" class="border-b border-gray-500 border-dotted">
                Terms of Service
            </a>
            and its
            <a href="#" class="border-b border-gray-500 border-dotted">
                Privacy Policy
            </a>
        </p>
    </UForm>
</template>
<script setup>
import { z } from "zod";

const { toastError } = useAppToast();
const state = ref({
  email: undefined,
  password: undefined
});
const schema = z.object({
  email: z.string().email().nonempty('Field is required'),
  password: z.string().min(7, "Hasło musi zawierać przynajmniej 7 znaków"),
});

const registerWithEmail = async () => {
  try {
  const { user, session, error } = await supabase.auth.signUp({
  email: state.value.email,
  password: state.value.password,
})
if (error) {
      toastError.add({
        title: "Error authenticating",
        color: "red",
      });
    } else {
      success.value = true;
    }
  } finally {
    pending.value = false;
  }
}
</script>