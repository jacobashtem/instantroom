export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();

  if (!user.value) {
    return navigateTo('/');
  }
  const { getUser } = useLoggedIn();
  const { getTokens } = useUserTokens();

  await getUser();
  getTokens();
});
