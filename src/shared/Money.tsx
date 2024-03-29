import { defineComponent, PropType } from 'vue'
export const Money = defineComponent({
  props: {
    value: {
      type: Number as PropType<number>,
      required: true
    }
  },
  setup: (props, context) => {
    return () => <span>{addZero(props.value / 100)}</span>
  }
})

export const addZero = (n: number) => {
  const amount = n.toString()
  if (amount.indexOf('.') < 0) {
    return amount + '.00'
  } else if (amount.slice(amount.indexOf('.')).length === 2) {
    return amount + '0'
  } else {
    return amount
  }
}

export const getMoney = (n: number) => {
  return addZero(n / 100)
}
