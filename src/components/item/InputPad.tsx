import { DatetimePicker, Popup } from "vant";
import { defineComponent, PropType, ref } from "vue";
import { Icon } from "../../shared/Icon";
import { Time } from "../../shared/time";
import s from "./InputPad.module.scss";
export const InputPad = defineComponent({
  props: {
    happenAt: String,
    amount: Number,
    onSubmit: {
      type: Function as PropType<() => void>,
    },
  },
  emits: ["update:happenAt", "update:amount"],
  setup: (props, context) => {
    const refAmount = ref(props.amount ? (props.amount / 100).toString() : "0");
    const appendText = (n: number | string) => {
      const nString = n.toString();
      if (refAmount.value.slice(refAmount.value.indexOf(".")).length > 2)
        return;
      if (refAmount.value.length >= 16) return;
      if (refAmount.value === "0" && nString === "0") return;
      if (refAmount.value.indexOf(".") >= 0 && nString === ".") return;
      if (refAmount.value === "0" && nString !== ".") refAmount.value = nString;
      else refAmount.value += nString;
      if (refAmount.value === "0") refAmount.value = "0.";
    };
    const buttons = [
      {
        text: "1",
        onClick: () => {
          appendText(1);
        },
      },
      {
        text: "2",
        onClick: () => {
          appendText(2);
        },
      },
      {
        text: "3",
        onClick: () => {
          appendText(3);
        },
      },
      {
        text: "4",
        onClick: () => {
          appendText(4);
        },
      },
      {
        text: "5",
        onClick: () => {
          appendText(5);
        },
      },
      {
        text: "6",
        onClick: () => {
          appendText(6);
        },
      },
      {
        text: "7",
        onClick: () => {
          appendText(7);
        },
      },
      {
        text: "8",
        onClick: () => {
          appendText(8);
        },
      },
      {
        text: "9",
        onClick: () => {
          appendText(9);
        },
      },
      {
        text: ".",
        onClick: () => {
          appendText(".");
        },
      },
      {
        text: "0",
        onClick: () => {
          appendText(0);
        },
      },
      {
        text: "清空",
        onClick: () => {
          refAmount.value = "0";
        },
      },
      {
        text: "提交",
        onClick: () => {
          context.emit("update:amount", parseFloat(refAmount.value) * 100);
          props.onSubmit?.();
        },
      },
    ];
    const refDatePickerVisible = ref(false);
    const showDatePicker = () => (refDatePickerVisible.value = true);
    const hideDatePicker = () => (refDatePickerVisible.value = false);
    const setDate = (date: Date) => {
      context.emit("update:happenAt", date.toISOString());
      hideDatePicker();
    };
    return () => (
      <>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="note" class={s.icon} />
            <span onClick={showDatePicker}>
              {new Time(props.happenAt).format()}
            </span>
            <Popup position="bottom" v-model:show={refDatePickerVisible.value}>
              <DatetimePicker
                value={props.happenAt}
                type="date"
                title="选择年月日"
                onConfirm={setDate}
                onCancel={hideDatePicker}
              />
            </Popup>
          </span>
          <span class={s.amount}>{refAmount.value}</span>
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

