export const setClientCookie = (name: string, value: string) => {
  if (typeof window === 'undefined') {
    console.warn('setClientCookie can only be used in client-side code')
    return
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax; max-age=31536000`
}
