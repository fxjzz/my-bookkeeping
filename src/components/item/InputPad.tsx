import { DatetimePicker, Popup } from "vant";
import { defineComponent, PropType, ref } from "vue";
import { Icon } from "../../shared/Icon";
import { time } from "../../shared/time";
import s from "./InputPad.module.scss";
export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refDate = ref<Date>();
    const now = new Date();
    const buttons = [
      { text: "7", onClick: () => {} },
      { text: "8", onClick: () => {} },
      { text: "9", onClick: () => {} },
      { text: "清空", onClick: () => {} },
      { text: "4", onClick: () => {} },
      { text: "5", onClick: () => {} },
      { text: "6", onClick: () => {} },
      { text: "+", onClick: () => {} },
      { text: "1", onClick: () => {} },
      { text: "2", onClick: () => {} },
      { text: "3", onClick: () => {} },
      { text: "-", onClick: () => {} },
      { text: "0", onClick: () => {} },
      { text: ".", onClick: () => {} },
      { text: "删", onClick: () => {} },
      { text: "ok", onClick: () => {} },
    ];
    const refShowPop = ref(false)
    return () => (
      <>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="note" class={s.icon} />
            <span onClick={() => (refShowPop.value = true)}>
              {time(refDate.value).format()}
            </span>
            <Popup position="bottom" v-model:show={refShowPop.value}>
              <DatetimePicker
                v-model={refDate.value}
                type="date"
                title="选择年月日"
                onConfirm={() => (refShowPop.value = false)}
              />
            </Popup>
          </span>
          <span class={s.amount}>199.12</span>
        </div>
        <div class={s.buttons}>
          {buttons.map((button) => (
            <button onClick={button.onClick}>{button.text}</button>
          ))}
        </div>
      </>
    );
  },
});
