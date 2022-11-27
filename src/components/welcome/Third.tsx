import s from './welcome.module.scss'
import { FunctionalComponent } from 'vue'
    
export const Third:FunctionalComponent = () => {
  return <div class={s.card}>
    <svg>
      <use xlinkHref='#chart'></use>
    </svg>
    <h2>数据可视化<br/>数据一目了然</h2>
  </div>
}
         
Third.displayName='Third'