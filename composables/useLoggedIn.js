export const useLoggedIn = () => {
  const supabase = useSupabaseClient();
  const supabaseUser = useSupabaseUser();
  const isLoggedIn = useState('isLoggedIn', () => false);

  const getUser = async () => {
    // Pobiera świeżego usera z Supabase, razem z metadanymi
    const { data, error } = await supabase.auth.getUser();

    if (!error && data?.user) {
      supabaseUser.value = data.user; // 🧠 nadpisanie reaktywnego użytkownika
      isLoggedIn.value = true;
      console.log('✅ Użytkownik zaktualizowany:', data.user.user_metadata);
    } else {
      console.warn('❌ Nie udało się pobrać użytkownika:', error?.message);
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
