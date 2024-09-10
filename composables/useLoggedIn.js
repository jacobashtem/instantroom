export const useLoggedIn = () => {
    const isLoggedIn = useState('isLoggedIn', () => false);
    const getUser = async () => {
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
  