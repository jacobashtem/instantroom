<template>
    <button label="Open" @click="isOpen = true"
        class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-coolGray-300 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
        <div class="w-8 h-8 flex bg-white p-2 rounded-full">
            <UIcon class="" name="i-fa-solid:hat-wizard" dynamic></UIcon>
        </div>
        <span class="ml-4 text-xs">
            Skorzystaj z 'Magic Link'
        </span>
        <div>
            <UModal v-model="isOpen" class="p-0 px-0 py-0">
                <div class="p-4">
                    <UCard v-if="!success">
                        <template #header> Zaloguj się wykorzystując 'Magic Link' </template>
                        <form @submit.prevent="signInWithMagicLink">
                            <UFormGroup label="Email" name="email" class="mb-4" :required="true"
                                help="Otrzymasz wiadomość e-mail z linkiem potwierdzającym">
                                <UInput
                                :inputClass="'focus:ring-aquaBlue-500 mb-4 w-full px-8 py-4 rounded-lg font-medium text-sm w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'"
                                    type="email" placeholder="Email" required v-model="email" />
                            </UFormGroup>

                                <UButton :loading="pending" :disabled="pending" type="submit" color="primary" variant="solid"
                                    class="disabled:bg-aquaBlue-200 bg-aquaBlue-500 hover:bg-aquaBlue-700 mt-5 tracking-wide font-semibold text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <div v-if="!pending">
                                    <UIcon width="24" height="24" name="ant-design:user-add-outlined" dynamic />
                                    <span class="ml-3"> Zaloguj </span> 
                                    </div>
                                </UButton>
                        </form>
                    </UCard>
                    <UCard v-else>
                        <template #header> Wysłano email. </template>

                        <div class="text-center">
                            <p class="mb-4">
                                Wysłano email na
                                <strong>{{ email }}</strong> z linkiem do automatycznego logowania.
                            </p>
                            <p>
                                <strong>Ważne:</strong> Link wygaśnie w przeciągu 5 minut
                            </p>
                        </div>
                    </UCard>
                </div>
            </UModal>
        </div>
    </button>
</template>

<script setup>
const pending = ref(false);
const success = ref(false);
const isOpen = ref(false);
const email = ref("");
const supabase = useSupabaseClient();
const signInWithMagicLink = async () => {
    pending.value = true;

    try {
        const { error } = await supabase.auth.signInWithOtp({
            email: email.value,
            options: {
                emailRedirectTo: "http://localhost:3000/confirm",
            },
        });

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
};
</script>