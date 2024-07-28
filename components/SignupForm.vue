<template>
  <UTabs :items="items">
    <template #item="{ item }">
      <!-- <template> -->
        <!-- <div class="mb-4 border-b text-center">
          <div
            class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
            lub {{item.btnTxt}} się się za pomocą e-mail
          </div>
        </div> -->
        <UForm v-if="!success" :state="state" :schema="schema" class="mx-auto max-w-xs" @submit="handleForm(item)">
          <UFormGroup name="email" class="mb-4" :required="true">
            <UInput v-model="state.email"
              :inputClass="'focus:ring-aquaBlue-500 mb-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'"
              type="email" placeholder="Email" required />
          </UFormGroup>
          <UFormGroup name="password" class="mb-4" :required="true"
            :help="item.key === 'Rejestracja' ? 'Po kliknięciu w button, otrzymasz wiadomość e-mail z linkiem potwierdzającym': 'Po podaniu swoich danych logowania, zostaniesz zalogowany do serwisu.'">
            <UInput v-model="state.password"
              :inputClass="'focus:ring-aquaBlue-500 mb-4 w-full px-8 py-4 rounded-lg font-medium text-sm w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'"
              type="password" placeholder="Hasło" required />
          </UFormGroup>
          <UButton :loading="loading" type="submit" :disabled="isFormInvalid"
            :class="isFormInvalid ? 'bg-aquaBlue-200' : 'bg-aquaBlue-500 hover:bg-aquaBlue-700'" color="primary"
            variant="solid"
            class="disabled:bg-aquaBlue-200 bg-aquaBlue-500 hover:bg-aquaBlue-700 mt-5 tracking-wide font-semibold text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
            <div v-if="!loading">
              <UIcon width="24" height="24" name="ant-design:user-add-outlined" dynamic />
              <span class="ml-3"> {{item.btnTxt}} </span>
            </div>
          </UButton>
          <!-- <div v-if="item.key === 'Rejestracja'">
            <p class="mt-6 text-xs text-gray-600 text-center">
              I agree to abide by templatana's
              <a href="#" class="border-b border-gray-500 border-dotted">
                Terms of ServicePo kliknięciu w button, otrzymasz wiadomość e-mail z linkiem potwierdzającym
              </a>
              and its
              <a href="#" class="border-b border-gray-500 border-dotted">
                Privacy Policy
              </a>
            </p>
          </div> -->
        </UForm>
        <div class="text-lg text-sunsetOrange-500 font-semibold" v-else>
          Dokonano rejestracji. Za chwilę otrzymasz mail z linkiem umożliwiającym potwierdzenie rejestracji.
        </div>
      <!-- </template> -->
    </template>
  </UTabs>
</template>
<script setup>
import { z } from "zod";
const items = [{
  key: 'Rejestracja',
  label: 'Rejestracja',
  btnTxt: 'Zarejestruj się'
}, {
  key: 'Logowanie',
  label: 'Logowanie',
  btnTxt: "Zaloguj się"
}]

const loading = ref(false);
const success = ref(false);
const supabase = useSupabaseClient();
useRedirectBasedOnAuth();
const { toastSuccess, toastError } = useAppToast();
const state = ref({
  email: undefined,
  password: undefined
});
const schema = z.object({
  email: z.string().email('Niepoprawny email').nonempty('Field is required'),
  password: z.string().min(7, "Hasło musi zawierać przynajmniej 7 znaków").regex(/[A-Z]/, "Hasło musi zawierać przynajmniej jedną wielką literę")
    .regex(/[a-z]/, "Hasło musi zawierać przynajmniej jedną małą literę")
    .regex(/[0-9]/, "Hasło musi zawierać przynajmniej jedną cyfrę")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Hasło musi zawierać przynajmniej jeden znak specjalny"),
});
const errors = ref({});

const validateForm = () => {
  try {
    schema.parse(state.value);
    errors.value = {};
  } catch (e) {
    const formattedErrors = {};
    e.errors.forEach(error => {
      formattedErrors[error.path[0]] = error.message;
    });
    errors.value = formattedErrors;
  }
};

const isFormInvalid = computed(() => {
  validateForm();
  return Object.keys(errors.value).length > 0 || !state.value.email || !state.value.password;
});
const handleForm = (formType) => {
  if(formType.label === 'Rejestracja') {
    registerWithEmail();
  } else {
    signInWithEmail();
  }
  
}
const signInWithEmail = async () => {
  loading.value = true;
  try {
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email: state.value.email,
      password: state.value.password,
      options: {
                emailRedirectTo: "http://localhost:3000/confirm",
            },
    })
    if (error) {
      toastError({
        title: `Wystąpił błąd. Spróbuj ponownie.`,
        color: "red",
      });
    } else {
      success.value = true;
    }
  } finally {
    loading.value = false;
    toastSuccess({
      title: 'Użytkownik został zalogowany.',
      color: "red",
    });
  }
}
const registerWithEmail = async () => {
  loading.value = true;
  try {
    const { user, session, error } = await supabase.auth.signUp({
      email: state.value.email,
      password: state.value.password,
    })
    if (error) {
      toastError({
        title: `Wystąpił błąd. Spróbuj ponownie.`,
        color: "red",
      });
    } else {
      success.value = true;
    }
  } finally {
    loading.value = false;
    success.value = true;
    toastSuccess({
      title: 'Dane zostały wysłane. Sprawdź swoją pocztę email.',
      color: "red",
    });
  }
}
</script>