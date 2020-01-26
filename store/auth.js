export const state = () => ({
  token: null
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  }
}

export const actions = {
  async login({commit, dispatch}, formData) {
    try {
      const {token} = await this.$axios.$post('/api/auth/admin/login', formData)
      console.log('token', token)
      dispatch('setToken', token)
    } catch (e) {
      // root смотрит мутацию setError в корне
      commit('setError', e, {root: true})
      throw e
    }    
  },
  async createUser({commit}, formData) {
    try {
      // адрес берем с /server/routes/auth.routes.js - /api/auth/admin/create
      await this.$axios.post('/api/auth/admin/create', formData)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  setToken({commit}, token) {
    commit('setToken', token)
  },
  logout({commit}) {
    commit('clearToken')
  }
}

export const getters = {
  isAuthenticated: state => Boolean(state.token)
}