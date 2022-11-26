import { defineComponent } from 'vue';
import s from './WelcomeLayout.module.scss'
import logo from '../../assets/icons/clock.svg'
import { RouterLink} from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';

export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>
        {{
          icon:()=><img class={s.icon} src={logo}/>,
          title:()=><h2>每日提醒<br/>不遗漏每一笔账单</h2>,
          nav:()=><>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink to="/welcome/3">下一页</RouterLink>
          <RouterLink class={s.next} to="/start">跳过</RouterLink>
          </>
        }}
      </WelcomeLayout>
    )
  }
})
