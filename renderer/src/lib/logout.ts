export const logout = () => {
  window.ipc.send('logout', {})
}
