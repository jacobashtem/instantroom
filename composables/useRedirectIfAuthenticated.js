export const useRedirectBasedOnAuth = (authenticatedUrl = '/', unauthenticatedUrl = '/login') => {
  const user = useSupabaseUser();
  const router = useRouter();

  watch(user, (newUser) => {
    const currentRoute = router.currentRoute.value.path;

    if (newUser && currentRoute !== authenticatedUrl) {
      navigateTo(authenticatedUrl);
    } else if (!newUser && currentRoute !== unauthenticatedUrl) {
      navigateTo(unauthenticatedUrl);
    }
  }, { immediate: true });

  return { user };
}
