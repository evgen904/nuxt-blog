// Сookie для получения значения куки, для парсинга
import Сookie from 'cookie'

// Сookies для создания и удаления куки
import Сookies from 'js-cookie'

// для того чтобы распарсить jwtToken
import jwtToken from 'jwt-decode'
import JwtDecode from 'jwt-decode'

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
    // сохраняем токен в хедер, чтобы работала авторизация
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)

    // создаем куку для токена
    Сookies.set('jwt-token', token)
  },
  logout({commit}) {
    // очищаем токен
    this.$axios.setToken(false)
    commit('clearToken')

    // если выходим то удалим куку
    Сookies.remove('jwt-token')
  },
  autoLogin({dispatch}) {
    // надо забрать значение токена которое храним локально
    // localStorage не подойдет по этому используем Cookie, т.к. они сохраняются и на сервере

    // cookieStr хранит строку, по этому распарсим ее
    // также проверим находимя на клиенте или на бэкенде
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie

    // парсим куку
    const cookies = Сookie.parse(cookieStr || '') || {}
    
    // забираем значения токена
    const token = cookies['jwt-token']

    // если токен валидный
    if (isJWTValid(token)) {
      dispatch('setToken', token)
    } else {
      // иначе выходи
      dispatch('logout')
    }
  }
}

export const getters = {
  isAuthenticated: state => Boolean(state.token),
  token: state => state.token
}

// локальная функция для валидации токен, проверка не просто ли текст приходит
function isJWTValid(token) {
  // если не передавали значения токена то возвращаем false
  if (!token) {
    return false
  }

  // распарсим токен
  const jwtData = JwtDecode(token) || {}
  
  // когда токен закончит свое существование
  const expires = jwtData.exp || 0
  
  // проверим текущим таймштамп, если текущий таймштамп меньше expires то токен валидный, если больше то нет
  return (new Date().getTime() / 1000) < expires
}