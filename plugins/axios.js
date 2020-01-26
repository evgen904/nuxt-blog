export default function ({ $axios, redirect, store }) {

  // данный плагин вызывается и на фронте и на бэкенде

  // interceptors позволяет перехватывать запрос и с ним что-то делать
  // есть запрос request, и responce ответ
  $axios.interceptors.request.use(request => {
    // добавляем хедер на бэкенде для авторизации ssr
    // если с большой буквы то можно написать так .common['Authorization']
    // или же так сразу .common.Authorization
    if (store.getters['auth/isAuthenticated'] && !request.headers.common['Authorization']) {
      // добавляем если есть токен
      const token = store.getters['auth/token']
      request.headers.common['Authorization'] = `Bearer ${token}`
    }
    
    return request
  })


  $axios.onError(error => {
    if (error.response) {
      if (error.response.status === 401) {
        // срок сессии истек заного залогинтесь
        redirect('/admin/login?message=session')

        // очищаем все токены, если он не валидный, также в куках удалит
        store.dispath('auth/logout')
      }

      // если сервер сломался
      if (error.response.status === 401) {
        console.log('Server 500 error')
      }
    }
  })

}