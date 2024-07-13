
export const useUserTokens = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const tokens = ref(null);

  const getTokens = () => {
    if (!user.value) return null;

    tokens.value = user.value.user_metadata?.tokens || 0;
  };

  const updateTokens = async (newTokens) => {
    if (!user.value) return;

    const { error } = await supabase.auth.updateUser({
      data: {
        tokens: newTokens,
      },
    });

    if (error) {
      console.error('Error updating tokens:', error);
      return;
    }

    tokens.value = newTokens;
  };

  watch(user, () => {
    if (user.value) {
      getTokens();
    } else {
      tokens.value = null;
    }
  }, { immediate: true });

  return { tokens, getTokens, updateTokens };
};
