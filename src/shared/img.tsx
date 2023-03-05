import { defineComponent, PropType } from 'vue'
import s from './img.module.scss'
import p from '@images/picture.png'

export const Img = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.center}>
        <img src={p} class={s.p} />
      </div>
    )
  }
})
