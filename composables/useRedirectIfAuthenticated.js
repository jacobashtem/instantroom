export const useRedirectBasedOnAuth = (authenticatedUrl = '/', unauthenticatedUrl = '/login') => {
  const user = useSupabaseUser()
  
  watch(user, (newUser) => {
    if (newUser) {
      navigateTo(authenticatedUrl)
    } else {
      navigateTo(unauthenticatedUrl)
    }
  }, { immediate: true })
  
  return { user }
}
