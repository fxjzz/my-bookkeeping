import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Icon } from './Icon'
import s from './Overlay.module.scss'
import { useMeStore } from '../stores/useMeStore'
import { Dialog } from 'vant'

const list = [
  { name: '记一笔账', to: '/items/create', icon: 'money' },
  { name: '记账总览', to: '/items', icon: 'total' },
  { name: '统计图表', to: '/statistics', icon: 'chart' },
  { name: '导出数据', to: '/export', icon: 'export' }
]

export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>
    }
  },
  setup: (props, context) => {
    const meStore = useMeStore()
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
      meStore.$reset()
      router.push('/sign_in')
    }
    onMounted(() => {
      meStore.mePromise!.then(
        (res) => {
          me.value = res?.data.resource
        },
        () => {
          throw new Error('未登录')
        }
      )
    })
    return () => (
      <div>
        <div class={s.mask} onClick={close}></div>
        <div class={s.overlay}>
          <section class={s.currentUser}>
            {me.value ? (
              <div>
                <h2>您好！{userName(me.value.email)}</h2>
                <p onClick={onSignOut} class={s.p}>
                  登出
                  <Icon name="out" class={s.out} />
                </p>
              </div>
            ) : (
              <RouterLink to={`/sign_in?return?${route.fullPath}`}>
                <h2>未登录</h2>
              </RouterLink>
            )}
          </section>
          <nav>
            <ul class={s.action_list}>
              {list.map((l) => (
                <RouterLink to={l.to} class={[s.action, route.fullPath === l.to ? s.selected : '']}>
                  <Icon name={l.icon} class={s.icon} />
                  <span>{l.name}</span>
                </RouterLink>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    )
  }
})
