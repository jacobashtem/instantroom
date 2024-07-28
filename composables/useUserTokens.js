export const useUserTokens = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser()
  const tokens = ref(null);
  const showModal = ref(false);

  const getTokens = () => {
    if (!user.value) return null;
    tokens.value = user.value.user_metadata?.tokens || 0;
  };

  const updateTokens = async (newTokens) => {
    if (!user.value) return;

    const currentTokens = parseInt(tokens.value) || 0;
    const updatedTokens = currentTokens + parseInt(newTokens);

    const { error } = await supabase.auth.updateUser({
      data: {
        tokens: updatedTokens,
      },
    });

    if (error) {
      console.error('Error updating tokens:', error);
      return;
    }

    tokens.value = updatedTokens;
  };

  const decrementToken = async () => {
    if (!user.value || tokens.value <= 0) return;

    const updatedTokens = parseInt(tokens.value) - 1;

    const { error } = await supabase.auth.updateUser({
      data: {
        tokens: updatedTokens,
      },
    });

    if (error) {
      console.error('Error decrementing token:', error);
      return;
    }

    tokens.value = updatedTokens;
  };

  const checkAndShowModal = () => {
    if (!user.value) return;

    const userMetadata = user.value.user_metadata || {};
    if (userMetadata.freeTokensGranted && !userMetadata.modalShown) {
      showModal.value = true;
    }
  };

  const closeFreeTokensGrantedModal = async () => {
    if (!user.value) return;

    const { error } = await supabase.auth.updateUser({
      data: {
        modalShown: true, 
      },
    });

    if (error) {
      console.error('Error updating modal shown status:', error);
      return;
    }

    showModal.value = false;
  };

  watch(user, () => {
    if (user.value) {
      getTokens();
      checkAndShowModal();
    } else {
      tokens.value = null;
      showModal.value = false;
    }
  }, { immediate: true });

  return { tokens, showModal, getTokens, updateTokens, decrementToken, closeFreeTokensGrantedModal };
};
