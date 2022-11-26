import { defineComponent } from 'vue';
import s from './First.module.scss'
import logo from '../../assets/icons/cloud.svg'
import { RouterLink} from 'vue-router';

export const Forth = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.icon} src={logo}/>
          <h2>每日提醒<br/>不遗漏每一笔账单</h2>
        </div>
        <div class={s.actions}>
          <div class={s.fake}>跳过</div>
          <RouterLink to="/start">完成</RouterLink>
          <div class={s.fake}>跳过</div>
        </div>
      </div>
    )
  }
})