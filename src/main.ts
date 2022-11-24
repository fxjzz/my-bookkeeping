import { createApp } from 'vue'
import { App } from './App'
import { Bar } from './views/Bar'
import { Foo } from './views/Foo'
import {createRouter,createWebHashHistory} from 'vue-router'
const routes = [
    {path:'/',component:Foo},
    {path:'/xxx',component:Bar}
]
const router = createRouter({
    history:createWebHashHistory(),
    routes, 
  })
const app = createApp(App)
app.use(router)
app.mount('#app')
