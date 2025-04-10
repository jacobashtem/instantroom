<template>
  <div>
    <section>
      <h3 class="text-left text-2xl font-semibold mb-2">
        Zarządzanie subskrypcją
      </h3>
      <div class="mb-4 flex flex-col gap-4">
        <div class="text-gray-700">
          <template v-if="isSubscriptionActive">
            <p v-if="isSubscriptionActive && !isCancellationPlanned && !cancelPlannedManually">
              Subskrypcja jest aktywna do:
              <span class="font-medium text-black">{{ formattedSubscriptionEnd }}</span>
            </p>
            <p v-else>
              Subskrypcja została anulowana – wygaśnie:
              <span class="font-medium text-black">{{ formattedSubscriptionEnd }}</span>
            </p>
          </template>
          <template v-else>
            Nie masz aktywnej subskrypcji. Możesz ją aktywować 
            <NuxtLink to="/cennik" class="text-aquaBlue-500 hover:underline">tutaj</NuxtLink>.
          </template>
          
        </div>

        <div v-if="isSubscriptionActive && !isCancellationPlanned && !cancelPlannedManually">
          <UButton @click="showCancelModal = true" :disabled="cancelling" class="rounded-lg bg-sunsetOrange-500 py-3 hover:bg-sunsetOrange-700">
            <span v-if="!cancelling">Anuluj subskrypcję</span>
            <span v-else class="flex items-center gap-2">
              <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Anulowanie...
            </span>
          </UButton>
        </div>

        <div v-else-if="isSubscriptionActive && (isCancellationPlanned || cancelPlannedManually) && !resumePlannedManually">
          <UButton @click="showResumeModal = true" :disabled="resuming" class="rounded-lg bg-aquaBlue-500 transition-all hover:bg-aquaBlue-700 py-3 w-auto">
            <span v-if="!resuming">Wznów subskrypcję</span>
            <span v-else class="flex items-center gap-2">
              <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Wznawianie...
            </span>
          </UButton>
        </div>
      </div>

      <!-- MODAL: Anulowanie -->
      <UModal v-model="showCancelModal">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900">Potwierdź anulowanie subskrypcji</h3>
          <p class="text-sm text-gray-600 mt-2">
            Czy na pewno chcesz anulować subskrypcję? Nadal będzie aktywna do: <span class="font-medium">{{ formattedSubscriptionEnd }}</span>
          </p>
          <div class="mt-4 flex justify-end gap-2">
            <UButton @click="showCancelModal = false" variant="ghost">Anuluj</UButton>
            <UButton @click="cancelSubscription" :loading="cancelling" class="bg-sunsetOrange-500 hover:bg-sunsetOrange-700">Tak, anuluj</UButton>
          </div>
        </div>
      </UModal>

      <!-- MODAL: Wznawianie -->
      <UModal v-model="showResumeModal">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900">Potwierdź wznowienie subskrypcji</h3>
          <p class="text-sm text-gray-600 mt-2">
            Twoja subskrypcja została wcześniej anulowana. Czy chcesz ją teraz wznowić?
          </p>
          <div class="mt-4 flex justify-end gap-2">
            <UButton @click="showResumeModal = false" variant="ghost">Nie</UButton>
            <UButton @click="resumeSubscription" :loading="resuming" class="rounded-lg bg-aquaBlue-500 transition-all hover:bg-aquaBlue-700 py-3 w-auto">Tak, wznów</UButton>
          </div>
        </div>
      </UModal>
    </section>

    <section>
      <h3 class="text-left text-2xl font-semibold mb-2">Zmiana hasła</h3>
      <UForm :state="state" @submit="saveProfile">
        <UFormGroup class="mb-4" label="Email" name="email">
          <UInput v-model="state.email" disabled />
          <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
        </UFormGroup>

        <UFormGroup class="mb-4" label="Nowe hasło" name="password">
          <UInput v-model="state.password" type="password" />
          <p v-if="errors.password" class="text-red-500">{{ errors.password }}</p>
        </UFormGroup>

        <UFormGroup class="mb-4" label="Potwierdź nowe hasło" name="confirmPassword">
          <UInput v-model="state.confirmPassword" type="password" />
          <p v-if="errors.confirmPassword" class="text-red-500">{{ errors.confirmPassword }}</p>
        </UFormGroup>

        <UButton class="rounded-lg bg-aquaBlue-500 transition-all hover:bg-aquaBlue-700 py-3 w-auto" type="submit" :loading="pending" :disabled="pending || !isFormValid" :class="{ 'opacity-50': pending || !isFormValid }">
          Zapisz
        </UButton>
      </UForm>
    </section>
  </div>
</template>

<script setup>
import { z } from 'zod'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { toastSuccess, toastError } = useAppToast()
const { getUser } = useLoggedIn()
const { isSubscriptionActive, subscriptionEnd } = useUserTokens()

const cancelPlannedManually = useCancelPlannedManually()
const resumePlannedManually = useResumePlannedManually()
const showCancelModal = useShowCancelModal()
const showResumeModal = useShowResumeModal()

const cancelling = ref(false)
const resuming = ref(false)

const formattedSubscriptionEnd = computed(() => {
  if (!subscriptionEnd.value) return null
  const timestamp = Number(subscriptionEnd.value) * 1000
  return new Date(timestamp).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
})

const isCancellationPlanned = computed(() => {
  return user.value?.user_metadata?.cancelled && !resumePlannedManually.value
})

watchEffect(() => {
  if (user.value?.user_metadata?.cancelled) {
    cancelPlannedManually.value = false
  } else {
    resumePlannedManually.value = false
  }
})

const cancelSubscription = async () => {
  if (!user.value?.id) return
  cancelling.value = true
  try {
    const data = await $fetch('/api/cancel-subscription', {
      method: 'POST',
      body: { userId: user.value.id },
    })
    if (data?.success) {
      cancelPlannedManually.value = true
      resumePlannedManually.value = false
      await getUser()
      toastSuccess({ title: 'Subskrypcja została anulowana. Wygaśnie na koniec okresu rozliczeniowego.' })
      showCancelModal.value = false
    } else {
      toastError({ title: 'Wystąpił błąd podczas anulowania subskrypcji.' })
    }
  } catch (e) {
    toastError({ title: 'Wystąpił błąd podczas anulowania subskrypcji.' })
  } finally {
    cancelling.value = false
  }
}

const resumeSubscription = async () => {
  if (!user.value?.id) return
  resuming.value = true
  try {
    const data = await $fetch('/api/resume-subscription', {
      method: 'POST',
      body: { userId: user.value.id },
    })
    if (data?.success) {
      resumePlannedManually.value = true
      cancelPlannedManually.value = false
      await getUser()
      toastSuccess({ title: 'Subskrypcja została wznowiona.' })
      showResumeModal.value = false
    } else {
      toastError({ title: 'Nie udało się wznowić subskrypcji.' })
    }
  } catch (e) {
    toastError({ title: 'Nie udało się wznowić subskrypcji.' })
  } finally {
    resuming.value = false
  }
}

const pending = ref(false)
const state = ref({
  email: user.value.email || '',
  password: '',
  confirmPassword: ''
})

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6).min(6,'Wymagane co najmniej 6 znaków').optional(),
  confirmPassword: z.string().min(6, 'Wymagane co najmniej 6 znaków').optional()
})

const errors = ref({})

const validate = () => {
  errors.value = {}
  try {
    schema.parse(state.value)
    if (state.value.password && state.value.password !== state.value.confirmPassword) {
      errors.value.confirmPassword = 'Hasła nie są takie same'
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
    toastError({ title: 'Błąd w formularzu', description: 'Popraw błędy w formularzu przed zapisem' })
    return
  }
  pending.value = true
  try {
    const data = { data: { full_name: state.value.name } }
    if (state.value.email !== user.value.email) {
      data.email = state.value.email
    }
    const { error } = await supabase.auth.updateUser(data)
    if (error) throw error
    if (state.value.password) {
      const { error: passwordError } = await supabase.auth.updateUser({ password: state.value.password })
      if (passwordError) throw passwordError
    }
    toastSuccess({ title: 'Profil zaktualizowany', description: 'Twój profil został zaktualizowany' })
  } catch (error) {
    toastError({ title: 'Błąd aktualizacji profilu', description: error.message })
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
