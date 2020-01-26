export const state = () => ({
  error: null
})

export const actions = {
  // nuxtServerInit диспатчитася когда запускается сервер, т.е. срабатывает первым
  nuxtServerInit({dispatch}) {
    dispatch('auth/autoLogin')
  }
}

export const mutations = {
  setError(state, error) {
    state.error = error
  },
  clearError(state) {
    state.error = null
  }
}

export const getters = {
  error: state => state.error
}