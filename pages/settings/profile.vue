<template>
  <div>
    <section>
      <h3 class="text-left text-2xl font-semibold mb-2">
        {{ t('profile.subscriptionManagement') }}
      </h3>
      <div class="mb-4 flex flex-col gap-4">
        <div class="text-gray-700">
          <template v-if="isSubscriptionActive">
            <p v-if="isSubscriptionActive && !isCancellationPlanned && !cancelPlannedManually">
              {{ t('profile.activeUntil') }}
              <span class="font-medium text-black">{{ formattedSubscriptionEnd }}</span>
            </p>
            <p v-else>
              {{ t('profile.cancelledExpires') }}
              <span class="font-medium text-black">{{ formattedSubscriptionEnd }}</span>
            </p>
          </template>
          <template v-else>
            {{ t('profile.noneActive') }} 
            <NuxtLink to="/cennik" class="text-aquaBlue-500 hover:underline">{{ t('profile.here') }}</NuxtLink>.
          </template>
          
        </div>

        <div v-if="isSubscriptionActive && !isCancellationPlanned && !cancelPlannedManually">
          <UButton @click="showCancelModal = true" :disabled="cancelling" class="rounded-lg bg-sunsetOrange-500 py-3 hover:bg-sunsetOrange-700">
            <span v-if="!cancelling">{{ t('profile.cancel') }}</span>
            <span v-else class="flex items-center gap-2">
              <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              {{ t('profile.cancelling') }}
            </span>
          </UButton>
        </div>

        <div v-else-if="isSubscriptionActive && (isCancellationPlanned || cancelPlannedManually) && !resumePlannedManually">
          <UButton @click="showResumeModal = true" :disabled="resuming" class="rounded-lg bg-aquaBlue-500 transition-all hover:bg-aquaBlue-700 py-3 w-auto">
            <span v-if="!resuming">{{ t('profile.resume') }}</span>
            <span v-else class="flex items-center gap-2">
              <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              {{ t('profile.resuming') }}
            </span>
          </UButton>
        </div>
      </div>

      <!-- MODAL: Anulowanie -->
      <UModal v-model="showCancelModal">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('profile.cancelModal.title') }}</h3>
          <p class="text-sm text-gray-600 mt-2">
            {{ t('profile.cancelModal.messagePre') }} <span class="font-medium">{{ formattedSubscriptionEnd }}</span>
          </p>
          <div class="mt-4 flex justify-end gap-2">
            <UButton @click="showCancelModal = false" variant="ghost">{{ t('profile.cancelModal.cancel') }}</UButton>
            <UButton @click="cancelSubscription" :loading="cancelling" class="bg-sunsetOrange-500 hover:bg-sunsetOrange-700">{{ t('profile.cancelModal.confirm') }}</UButton>
          </div>
        </div>
      </UModal>

      <!-- MODAL: Wznawianie -->
      <UModal v-model="showResumeModal">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('profile.resumeModal.title') }}</h3>
          <p class="text-sm text-gray-600 mt-2">
            {{ t('profile.resumeModal.message') }}
          </p>
          <div class="mt-4 flex justify-end gap-2">
            <UButton @click="showResumeModal = false" variant="ghost">{{ t('profile.resumeModal.no') }}</UButton>
            <UButton @click="resumeSubscription" :loading="resuming" class="rounded-lg bg-aquaBlue-500 transition-all hover:bg-aquaBlue-700 py-3 w-auto">{{ t('profile.resumeModal.yes') }}</UButton>
          </div>
        </div>
      </UModal>
    </section>

    <section>
      <h3 class="text-left text-2xl font-semibold mb-2">{{ t('profile.changePassword') }}</h3>
      <UForm :state="state" @submit="saveProfile">
        <UFormGroup class="mb-4" :label="t('profile.email')" name="email">
          <UInput v-model="state.email" disabled />
          <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
        </UFormGroup>

        <UFormGroup class="mb-4" :label="t('profile.newPassword')" name="password">
          <UInput v-model="state.password" type="password" />
          <p v-if="errors.password" class="text-red-500">{{ errors.password }}</p>
        </UFormGroup>

        <UFormGroup class="mb-4" :label="t('profile.confirmNewPassword')" name="confirmPassword">
          <UInput v-model="state.confirmPassword" type="password" />
          <p v-if="errors.confirmPassword" class="text-red-500">{{ errors.confirmPassword }}</p>
        </UFormGroup>

        <UButton class="rounded-lg bg-aquaBlue-500 transition-all hover:bg-aquaBlue-700 py-3 w-auto" type="submit" :loading="pending" :disabled="pending || !isFormValid" :class="{ 'opacity-50': pending || !isFormValid }">
          {{ t('profile.save') }}
        </UButton>
      </UForm>
    </section>
  </div>
</template>

<script setup>
import { z } from 'zod'

const { t, locale } = useI18n();
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
  const localeTag = locale.value === 'pl' ? 'pl-PL' : 'en-US'
  return new Date(timestamp).toLocaleDateString(localeTag, {
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
      toastSuccess({ title: t('profile.success.cancelled') })
      showCancelModal.value = false
    } else {
      toastError({ title: t('profile.errors.cancelSubscription') })
    }
  } catch (e) {
    toastError({ title: t('profile.errors.cancelSubscription') })
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
      toastSuccess({ title: t('profile.success.resumed') })
      showResumeModal.value = false
    } else {
      toastError({ title: t('profile.errors.resumeSubscription') })
    }
  } catch (e) {
    toastError({ title: t('profile.errors.resumeSubscription') })
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
  password: z.string().min(6).min(6, t('profile.errors.min6')).optional(),
  confirmPassword: z.string().min(6, t('profile.errors.min6')).optional()
})

const errors = ref({})

const validate = () => {
  errors.value = {}
  try {
    schema.parse(state.value)
    if (state.value.password && state.value.password !== state.value.confirmPassword) {
      errors.value.confirmPassword = t('profile.errors.passwordsNotSame')
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
    toastError({ title: t('profile.errors.formTitle'), description: t('profile.errors.formDesc') })
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
    toastSuccess({ title: t('profile.success.profileUpdatedTitle'), description: t('profile.success.profileUpdatedDesc') })
  } catch (error) {
    toastError({ title: t('profile.errors.profileUpdateTitle'), description: error.message })
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
