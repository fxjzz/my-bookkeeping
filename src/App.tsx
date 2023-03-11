import { defineComponent } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import './App.scss'
import useUser from './useQuery/useUser'

export const App = defineComponent({
  setup() {
    const router = useRouter()
    const { isSuccess } = useUser()
    router.beforeEach((to, from) => {
      if (
        to.path === '/' ||
        to.path.startsWith('/welcome') ||
        to.path.startsWith('/sign_in') ||
        to.path.startsWith('/start')
      ) {
        return true
      } else {
        return isSuccess ? true : `/sign_in?return_to= + ${from.path}`
      }
    })

    return () => (
      <div>
        <RouterView />
      </div>
    )
  }
})
