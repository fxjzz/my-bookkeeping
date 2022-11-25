import { defineComponent } from 'vue';
import s from './First.module.scss'
import logo from '../../assets/icons/money.svg'
import { RouterLink} from 'vue-router';

export const First = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.icon} src={logo}/>
          <h2>会挣钱<br/>还要会省钱</h2>
        </div>
        <div class={s.actions}>
          <div class={s.fake}>跳过</div>
          <RouterLink to="/welcome/2">下一页</RouterLink>
          <RouterLink class={s.next} to="/start">跳过</RouterLink>
        </div>
      </div>
    )
  }
})