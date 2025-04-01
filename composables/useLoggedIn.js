export const useLoggedIn = () => {
  const supabase = useSupabaseClient();
  const supabaseUser = useSupabaseUser();
  const isLoggedIn = useState('isLoggedIn', () => false);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (!error && data?.user) {
      supabaseUser.value = data.user;
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  };

  const clearUser = () => {
    isLoggedIn.value = false;
  };

  return {
    isLoggedIn,
    getUser,
    clearUser,
  };
};
