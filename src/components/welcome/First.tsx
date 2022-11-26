import s from './WelcomeLayout.module.scss'
import logo from '../../assets/icons/money.svg'
import { RouterLink} from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';

export const First = () => (
      <WelcomeLayout>
        {{
          icon:()=><img class={s.icon} src={logo}/>,
          title:()=><h2>会挣钱<br/>还会省钱</h2>,
          nav:()=><>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink to="/welcome/2">下一页</RouterLink>
          <RouterLink class={s.next} to="/start">跳过</RouterLink>
          </>
        }}
      </WelcomeLayout>
)
First.displayName='First'