<template>
    <div class="px-4 py-6 max-w-2xl mx-auto">
      <h2 class="text-xl font-semibold mb-4">Zarządzanie subskrypcją</h2>
  
      <div class="bg-white shadow rounded-lg p-6 space-y-4">
        <div class="text-gray-700">
          <p v-if="isSubscriptionActive && !isCancellationPlanned && !cancelPlannedManually">
            Subskrypcja jest aktywna do:
            <span class="font-medium text-black">{{ formattedSubscriptionEnd }}</span>
          </p>
          <p v-else>
            Subskrypcja została anulowana – wygaśnie:
            <span class="font-medium text-black">{{ formattedSubscriptionEnd }}</span>
          </p>
        </div>
  
        <div v-if="isSubscriptionActive && !isCancellationPlanned && !cancelPlannedManually">
          <UButton @click="showCancelModal = true" :disabled="cancelling" color="red">
            <span v-if="!cancelling">Anuluj subskrypcję</span>
            <span v-else class="flex items-center gap-2">
              <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Anulowanie...
            </span>
          </UButton>
        </div>
  
        <div v-else-if="isSubscriptionActive && (isCancellationPlanned || cancelPlannedManually) && !resumePlannedManually">
          <UButton @click="showResumeModal = true" :disabled="resuming" color="green">
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
            <UButton @click="cancelSubscription" :loading="cancelling" color="red">Tak, anuluj</UButton>
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
            <UButton @click="resumeSubscription" :loading="resuming" color="green">Tak, wznów</UButton>
          </div>
        </div>
      </UModal>
    </div>
  </template>
  
  <script setup>
  const { toastSuccess, toastError } = useAppToast()
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const { getUser } = useLoggedIn()
  const { isSubscriptionActive, subscriptionEnd } = useUserTokens()
  

  const cancelPlannedManually = useCancelPlannedManually()
  const resumePlannedManually = useResumePlannedManually()
  const showCancelModal = useShowCancelModal()
  const showResumeModal = useShowResumeModal()
  
  const cancelling = ref(false)
  const resuming = ref(false)
  
  const formattedSubscriptionEnd = computed(() => {
    if (!subscriptionEnd.value) return null;
    const timestamp = Number(subscriptionEnd.value) * 1000;
    return new Date(timestamp).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
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
  
    const { data, error } = await useFetch('/api/cancel-subscription', {
      method: 'POST',
      body: { userId: user.value.id },
    })
  
    if (!error.value && data.value?.success) {
      cancelPlannedManually.value = true
      resumePlannedManually.value = false
      await getUser()
      toastSuccess({ title: 'Subskrypcja została anulowana. Wygaśnie na koniec okresu rozliczeniowego.' })
      showCancelModal.value = false
    } else {
      toastError({ title: 'Wystąpił błąd podczas anulowania subskrypcji.' })
    }
  
    cancelling.value = false
  }
  
  const resumeSubscription = async () => {
    if (!user.value?.id) return
    resuming.value = true
  
    const { data, error } = await useFetch('/api/resume-subscription', {
      method: 'POST',
      body: { userId: user.value.id },
    })
  
    if (!error.value && data.value?.success) {
      resumePlannedManually.value = true
      cancelPlannedManually.value = false
      await getUser()
      toastSuccess({ title: 'Subskrypcja została wznowiona.' })
      showResumeModal.value = false
    } else {
      toastError({ title: 'Nie udało się wznowić subskrypcji.' })
    }
  
    resuming.value = false
  }
  </script>
  