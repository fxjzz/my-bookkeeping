import s from './WelcomeLayout.module.scss'
import logo from '../../assets/icons/chart.svg'
import { RouterLink} from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';

export const Third = () => (
      <WelcomeLayout>
        {{
          icon:()=><img class={s.icon} src={logo}/>,
          title:()=><h2>数据可视化<br/>数据一目了然</h2>,
          nav:()=><>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink to="/welcome/4">下一页</RouterLink>
          <RouterLink class={s.next} to="/start">跳过</RouterLink>
          </>
        }}
      </WelcomeLayout>
    )
Third.displayName='Third'