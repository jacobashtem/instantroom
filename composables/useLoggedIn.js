
export const useLoggedIn = () => {
  const supabase = useSupabaseClient();
    const isLoggedIn = useState('isLoggedIn', () => false);
    const getUser = async () => {
      const { data, error } = await  supabase.auth.refreshSession()
      const user = useSupabaseUser();
      isLoggedIn.value = user.value !== null && user.value !== undefined;
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
  