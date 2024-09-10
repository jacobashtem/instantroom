export const useRedirectBasedOnAuth = (authenticatedUrl = '/', unauthenticatedUrl = '/login') => {
  const user = useSupabaseUser();
  const router = useRouter();

  watch(() => user.value, (newUser) => {
    const currentRoute = router.currentRoute.value.path;

    if (newUser && currentRoute !== authenticatedUrl) {
      router.push(authenticatedUrl);
    }
    else if (!newUser && currentRoute !== unauthenticatedUrl) {
      router.push(unauthenticatedUrl);
    }
  }, { immediate: true });

  return { user };
}
