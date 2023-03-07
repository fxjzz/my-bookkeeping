import { defineComponent, onMounted, PropType, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Icon } from './Icon'
import s from './Overlay.module.scss'
import { mePromise } from './me'
import { Dialog } from 'vant'

export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>
    }
  },
  setup: (props, context) => {
    const close = () => {
      props.onClose?.()
    }
    const route = useRoute()
    const router = useRouter()
    const me = ref<User>()
    const userName = (name: string) => {
      return name.slice(0, name.indexOf('@'))
    }
    const onSignOut = async (e: Event) => {
      e.preventDefault()
      await Dialog.confirm({
        message: '是否退出登录？'
      })
      localStorage.removeItem('jwt')
      router.push('/sign_in')
    }
    onMounted(async () => {
      const response = await mePromise
      me.value = response?.data.resource
    })
    return () => (
      <div>
        <div class={s.mask} onClick={close}></div>
        <div class={s.overlay}>
          <section class={s.currentUser}>
            {me.value ? (
              <div>
                <h2>您好！{userName(me.value.email)}</h2>
                <p onClick={onSignOut}>退出登录</p>
              </div>
            ) : (
              <RouterLink to={`/sign_in?return?${route.fullPath}`}>
                <h2>未登录</h2>
              </RouterLink>
            )}
          </section>
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to="/items" class={s.action}>
                  <Icon name="total" class={s.icon} />
                  <span>记账总览</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/statistics" class={s.action}>
                  <Icon name="chart" class={s.icon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/export" class={s.action}>
                  <Icon name="export" class={s.icon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/notify" class={s.action}>
                  <Icon name="notify" class={s.icon} />
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
})
