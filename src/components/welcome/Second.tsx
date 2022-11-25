import { defineComponent } from 'vue';
import logo from '../../assets/icons/clock.svg'

export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <div>
        <img src={logo}/>
      </div>
    )
  }
})