export const useUserTokens = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const gtm = useGtm()
  const tokens = ref(null);
  const showModal = ref(false);
  const isSubscriptionActive = ref(false); // Dodane: Status subskrypcji
  const subscriptionEnd = ref(null); // Dodane: Data końca subskrypcji

  const getTokens = () => {
    if (!user.value) {
      return;
    }
    tokens.value = user.value.user_metadata?.tokens || 0;
    isSubscriptionActive.value = user.value.user_metadata?.isSubscriptionActive || false;
    subscriptionEnd.value = user.value.user_metadata?.subscriptionEnd || null;
  };

  const updateTokens = async (newTokens) => {
    if (!user.value) {
      return;
    }

    const currentTokens = parseInt(tokens.value) || 0;
    const updatedTokens = currentTokens + parseInt(newTokens);

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          tokens: updatedTokens,
        },
      });

      if (error) {
        console.error('Error updating tokens:', error);
        return;
      }

      tokens.value = updatedTokens;
    } catch (err) {
      console.error('Unexpected error updating tokens:', err);
    }
  };

  const decrementToken = async () => {
    if (!user.value || tokens.value <= 0) {
      return;
    }

    const updatedTokens = parseInt(tokens.value) - 1;

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          tokens: updatedTokens,
        },
      });

      if (error) {
        console.error('Error decrementing token:', error);
        return;
      }

      tokens.value = updatedTokens;
    } catch (err) {
      console.error('Unexpected error decrementing token:', err);
    }
  };

  const checkAndShowModal = () => {
    if (!user.value) {
      console.log('checkAndShowModal: No user');
      return;
    }
    const userMetadata = user.value.user_metadata || {};
    if (userMetadata.freeTokensGranted && !userMetadata.modalShown) {
      gtm.trackEvent({
        event: 'sign_up',
        category: 'sign_up',
        action: 'sign_up',
        method: user?.value.app_metadata.provider,
        email: user?.value.email,
        user: user?.value.id,
        email_confirmed_at: user?.value.email_confirmed_at,
      })
      showModal.value = true;
    }
  };

  const closeFreeTokensGrantedModal = async () => {
    if (!user.value) {
      return;
    }

    const userMetadata = user.value.user_metadata || {};

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          modalShown: true,
        },
      });

      if (error) {
        console.error('Error updating modal shown status:', error);
        return;
      }

      showModal.value = false;
    } catch (err) {
      console.error('Unexpected error updating modalShown:', err);
    }
  };

  watch(
    user,
    () => {
      if (user.value) {
        getTokens();
        checkAndShowModal();
      } else {
        tokens.value = null;
        showModal.value = false;
        isSubscriptionActive;
        isSubscriptionActive.value = false; // Reset statusu subskrypcji
        subscriptionEnd.value = null; // Reset daty końca subskrypcji
      }
    },
    { immediate: true }
  );

  return { tokens, showModal, getTokens, isSubscriptionActive, subscriptionEnd, updateTokens, decrementToken, closeFreeTokensGrantedModal };
};
