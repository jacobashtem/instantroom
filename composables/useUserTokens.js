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
  
    watch(user, () => {
      if (user.value) {
        getTokens();
      } else {
        tokens.value = null;
      }
    }, { immediate: true });
  
    return { tokens, getTokens, updateTokens };
  };
  