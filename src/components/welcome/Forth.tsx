import s from './welcome.module.scss'
import { FunctionalComponent } from 'vue'

export const Forth: FunctionalComponent = () => {
  return <div class={s.card}>
    <svg>
      <use xlinkHref='#cloud'></use>
    </svg>
    <h2>每日提醒<br />不遗漏每一笔账单</h2>
  </div>
}

Forth.displayName = 'Forth'