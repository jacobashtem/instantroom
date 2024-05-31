<template>
    <button label="Open" @click="isOpen = true"
        class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-coolGray-300 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
        <div class="bg-white p-2 rounded-full">
            <UIcon class="w-6 h-5" name="i-fa-solid:hat-wizard" dynamic></UIcon>
        </div>
        <span class="ml-4">
            use MagicLink
        </span>
        <div>
            <UModal v-model="isOpen" class="p-0 px-0 py-0">
                <div class="p-4">
                    <UCard v-if="!success">
                        <template #header> Sign-in using Magic Link </template>
                        <form @submit.prevent="signInWithMagicLink">
                            <UFormGroup label="Email" name="email" class="mb-4" :required="true"
                                help="You will receive an email with the confirmation link">
                                <UInput
                                    class="border-none w-full mt-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email" placeholder="Email" required v-model="email" />
                            </UFormGroup>

                            <UButton type="submit" variant="solid" color="black" :loading="pending" :disabled="pending">
                                Sign-in</UButton>
                        </form>
                    </UCard>
                    <UCard v-else>
                        <template #header> Email has been sent </template>

                        <div class="text-center">
                            <p class="mb-4">
                                We have sent an email to
                                <strong>{{ email }}</strong> with a link to sign-in.
                            </p>
                            <p>
                                <strong>Important:</strong> The link will expire in
                                5 minutes.
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