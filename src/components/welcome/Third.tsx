import { defineComponent } from 'vue';
import logo from '../../assets/icons/statistics.svg'

export const Third = defineComponent({
  setup: (props, context) => {
    return () => (
      <div>
        <img src={logo}/>
      </div>
    )
  }
})