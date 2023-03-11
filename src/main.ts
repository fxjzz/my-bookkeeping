import { createPinia } from 'pinia'
import { VueQueryPlugin } from 'vue-query'
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
app.use(VueQueryPlugin)
app.mount('#app')
