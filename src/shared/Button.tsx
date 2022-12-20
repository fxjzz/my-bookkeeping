import { defineComponent, PropType } from "vue";
import s from "./Button.module.scss";

export const Button = defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
    level: {
      type: String as PropType<"important" | "normal" | "danger">,
      default: "important",
    },
    type:{
      type:String as PropType<'sumbit'|'button'>,
      default:'button'
    }
  },
  setup: (props, context) => {
    return () => <button onClick={props.onClick} class={[s.button,s[props.level]]}>{context.slots.default?.()}</button>;
  },
});
