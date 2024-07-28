<template>
  <div>
    <UTabs :items="items">
      <template #item="{ item }">
        <div v-if="showResetPassword">
          <UForm :state="state" :schema="resetPasswordSchema" class="mx-auto max-w-xs" @submit="resetPassword">
            <UFormGroup name="email" class="mb-4" :required="true">
              <UInput v-model="state.email"
                :inputClass="'focus:ring-aquaBlue-500 mb-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'"
                type="email" placeholder="Email" required />
            </UFormGroup>
            <UButton :loading="loading" type="submit" :disabled="isResetFormInvalid"
              :class="isResetFormInvalid ? 'bg-aquaBlue-200' : 'bg-aquaBlue-500 hover:bg-aquaBlue-700'" color="primary"
              variant="solid"
              class="disabled:bg-aquaBlue-200 bg-aquaBlue-500 hover:bg-aquaBlue-700 mt-5 tracking-wide font-semibold text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
              <div v-if="!loading">
                <span class="ml-3">Zresetuj hasło</span>
              </div>
            </UButton>
          </UForm>
          <UButton @click="showResetPassword = false" class="mt-3">
            Wróć
          </UButton>
        </div>
        <div v-else>
          <UForm v-if="!success" :state="state" :schema="schema" class="mx-auto max-w-xs" @submit="handleForm(item)">
            <UFormGroup name="email" class="mb-4" :required="true">
              <UInput v-model="state.email"
                :inputClass="'focus:ring-aquaBlue-500 mb-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'"
                type="email" placeholder="Email" required />
            </UFormGroup>
            <UFormGroup name="password" class="mb-4" :required="true"
              v-if="!showResetPassword"
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
            <p v-if="item.key !== 'Rejestracja'" @click="showResetPassword = true" class="cursor-pointer hover:opacity-50 mt-5 bg-transparent border-0 shadow-none text-black pl-0 text-right ">
              Zapomniałem hasła
            </p>
          </UForm>
          <div class="text-lg text-sunsetOrange-500 font-semibold" v-else-if="success && item.key === 'Rejestracja'">
            Dokonano rejestracji. Za chwilę otrzymasz mail z linkiem umożliwiającym potwierdzenie rejestracji.
          </div>
        </div>
      </template>
    </UTabs>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
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
const showResetPassword = ref(false);
const isRecoveringPassowrd = ref(false);
const supabase = useSupabaseClient();
useRedirectBasedOnAuth();
const { toastSuccess, toastError } = useAppToast();
const state = ref({
  email: undefined,
  password: undefined
});

const schema = z.object({
  email: z.string().email('Niepoprawny email').regex(/^[^+]*$/, 'Email nie może zawierać znaków specjalnych').nonempty('Field is required'),
  password: z.string().min(7, "Hasło musi zawierać przynajmniej 7 znaków").regex(/[A-Z]/, "Hasło musi zawierać przynajmniej jedną wielką literę")
    .regex(/[a-z]/, "Hasło musi zawierać przynajmniej jedną małą literę")
    .regex(/[0-9]/, "Hasło musi zawierać przynajmniej jedną cyfrę")
    .regex(/[!@#$%^&*(),.?\":{}|<>]/, "Hasło musi zawierać przynajmniej jeden znak specjalny"),
});

const resetPasswordSchema = z.object({
  email: z.string().email('Niepoprawny email').regex(/^[^+]*$/, 'Email nie może zawierać znaków specjalnych').nonempty('Field is required')
});

const errors = ref({});

const validateForm = (schemaToValidate) => {
  try {
    schemaToValidate.parse(state.value);
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
  validateForm(schema);
  return Object.keys(errors.value).length > 0 || !state.value.email || !state.value.password;
});

const isResetFormInvalid = computed(() => {
  validateForm(resetPasswordSchema);
  return Object.keys(errors.value).length > 0 || !state.value.email;
});

const handleForm = async (formType) => {
  if(formType.label === 'Rejestracja') {
    await registerWithEmail();
  } else {
    await signInWithEmail();
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
    });

    if (error) {
      if (error.message === 'Invalid login credentials') {
        toastError({
          title: `Wpisano nieprawidłowe dane logowania.`,
          color: "red",
        });
      } else {
        toastError({
          title: `Wystąpił błąd. Spróbuj ponownie.`,
          description: error.error_description ||  error.message || error.error,
          color: "red",
        });
      }
    } else {
      success.value = true;
      toastSuccess({
        title: 'Użytkownik został zalogowany.',
        color: "green",
      });
    }
  } finally {
    loading.value = false;
  }
}


const registerWithEmail = async () => {
  loading.value = true;
  try {
    const { data } = await supabase.auth.signUp({
      email: state.value.email,
      password: state.value.password,
    });
    if (data.error) {
      toastError({
        title: `Wystąpił błąd. Spróbuj ponownie.`,
        color: "red",
      });
    } else if (data.user.aud === "authenticated") {
        toastError({
          title: `Konto o tym adresie email już istnieje.`,
          color: "red",
        });
        success.value = false;
        return false;;
      } 
     else {
      success.value = true;
    }
  } finally {
    loading.value = false;
    if (success.value) {
      toastSuccess({
        title: 'Dane zostały wysłane. Sprawdź swoją pocztę email.',
        color: "red",
      });
    };
  }
}

const resetPassword = async () => {
  loading.value = true;
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(state.value.email, {
      redirectTo: 'https://instantroom.pl/settings/profile',
    });
    if (error) {
      toastError({
        title: `Wystąpił błąd. Spróbuj ponownie.`,
        color: "red",
      });
    } else {
      toastSuccess({
        title: 'Link do resetowania hasła został wysłany.',
        color: "red",
      });
      showResetPassword.value = false;
    }
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      const newPassword = prompt('What would you like your new password to be?');
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });

      if (data) alert('Password updated successfully!');
      if (error) alert('There was an error updating your password.');
    }
  });
});
</script>
