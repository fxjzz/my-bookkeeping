import { defineComponent, PropType } from "vue";
export const Money = defineComponent({
  props: {
    money: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  setup: (props, context) => {
    const addZero = (n: number) => {
      const amount = n.toString();
      if (amount.indexOf(".") < 0) {
        return amount + ".00";
      } else if (amount.slice(amount.indexOf(".")).length === 2) {
        return amount + "0";
      } else {
        return amount;
      }
    };
    return () => <span>{addZero(props.money / 100)}</span>;
  },
});
