import s from './welcome.module.scss'
import logo from '../../assets/icons/chart.svg'
import { FunctionalComponent } from 'vue'
    
export const Third:FunctionalComponent = () => {
  return <div class={s.card}>
    <img src={logo}/>
    <h2>数据可视化<br/>数据一目了然</h2>
  </div>
}
         
Third.displayName='Third'