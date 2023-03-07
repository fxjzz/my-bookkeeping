import { createPinia } from 'pinia'
import { useMeStore } from './stores/useMeStore'
import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history'
import '@svgstore'

const router = createRouter({ history, routes })
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')

const meStore = useMeStore()
meStore.fetchMe()
console.log(meStore.fetchMe)

router.beforeEach((to, from) => {
  if (
    to.path === '/' ||
    to.path.startsWith('/welcome') ||
    to.path.startsWith('/sign_in') ||
    to.path.startsWith('/start')
  ) {
    return true
  } else {
    return meStore.mePromise!.then(
      () => true,
      () => '/sign_in?return_to=' + to.path
    )
  }
})
