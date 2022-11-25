import { defineComponent } from 'vue';
import logo from '../../assets/icons/cloud.svg'
export const Forth = defineComponent({
  setup: (props, context) => {
    return () => (
      <div>
        <img src={logo}/>
      </div>
    )
  }
})