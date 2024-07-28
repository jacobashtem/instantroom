<template>
  <div class="px-4 py-6">
  <UForm @submit="saveProfile">
    <UFormGroup class="mb-4" label="Email" name="email">
      <UInput  
      :inputClass="'focus:ring-aquaBlue-500 mb-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'" 
      v-model="state.email" disabled />
      <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
    </UFormGroup>

    <UFormGroup class="mb-4" label="Nowe hasło" name="password">
      <UInput
      :inputClass="'focus:ring-aquaBlue-500 mb-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'"
      v-model="state.password" type="password" />
      <p v-if="errors.password" class="text-red-500">{{ errors.password }}</p>
    </UFormGroup>

    <UFormGroup class="mb-4" label="Potwierdź nowe hasło" name="confirmPassword">
      <UInput
      :inputClass="'focus:ring-aquaBlue-500 mb-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'"
      v-model="state.confirmPassword" type="password" />
      <p v-if="errors.confirmPassword" class="text-red-500">{{ errors.confirmPassword }}</p>
    </UFormGroup>

    <UButton  class="bg-aquaBlue-500 hover:bg-aquaBlue-700 w-full disabled:bg-aquaBlue-200 bg-aquaBlue-500 hover:bg-aquaBlue-700 mt-5 tracking-wide font-semibold text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none max-w-[300px]" type="submit" color="black" variant="solid" label="Zapisz" :loading="pending" :disabled="pending || !isFormValid" :class="{ 'opacity-50': pending || !isFormValid }" />
  </UForm>
</div>
</template>

<script setup>
import { z } from 'zod'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { toastSuccess, toastError } = useAppToast()
const pending = ref(false)

const state = ref({
  name: user.value.user_metadata?.full_name || '',
  email: user.value.email || '',
  password: '',
  confirmPassword: ''
})

const schema = z.object({
  name: z.string().min(2, { message: "Imię musi mieć co najmniej 2 znaki" }).optional(),
  email: z.string().email({ message: "Niepoprawny adres email" }),
  password: z.string().min(6, { message: "Hasło musi mieć co najmniej 6 znaków" }).optional(),
  confirmPassword: z.string().min(6, { message: "Potwierdź hasło musi mieć co najmniej 6 znaków" }).optional()
})

const errors = ref({})

const validate = () => {
  errors.value = {}
  try {
    schema.parse(state.value)
    if (state.value.password && state.value.password !== state.value.confirmPassword) {
      errors.value.confirmPassword = "Hasła nie są takie same"
    }
  } catch (e) {
    e.errors.forEach(error => {
      errors.value[error.path[0]] = error.message
    })
  }
}

watch(() => state.value, validate, { deep: true })

const isFormValid = computed(() => Object.keys(errors.value).length === 0)

const saveProfile = async () => {
  validate()
  if (!isFormValid.value) {
    toastError({
      title: 'Błąd w formularzu',
      description: 'Popraw błędy w formularzu przed zapisem'
    })
    return
  }

  pending.value = true

  try {
    const data = {
      data: {
        full_name: state.value.name
      }
    }

    if (state.value.email !== user.value.email) {
      data.email = state.value.email
    }

    const { error } = await supabase.auth.updateUser(data)
    if (error) throw error

    if (state.value.password) {
      const { error: passwordError } = await supabase.auth.updateUser({ password: state.value.password })
      if (passwordError) throw passwordError
    }

    toastSuccess({
      title: 'Profil zaktualizowany',
      description: 'Twój profil został zaktualizowany'
    })
  } catch (error) {
    toastError({
      title: 'Błąd aktualizacji profilu',
      description: error.message
    })
  } finally {
    pending.value = false
  }
}
</script>

<style scoped>
.text-red-500 {
  color: #f56565;
}
</style>
