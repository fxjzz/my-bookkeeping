import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import { FormItem } from "../../shared/Form";
import s from "./Charts.module.scss";
import { Bars } from "./Bars";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { http } from "../../shared/Http";

type DataItem = { happen_at: string; amount: number };
type Data1 = DataItem[];

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false,
    },
    endDate: {
      type: String as PropType<string>,
      required: false,
    },
  },
  setup: (props, context) => {
    const kind = ref("expenses");
    const originalData = ref<Data1>([]);
    const lineData = computed(() => {
      return originalData.value.map(
        (item) => [item.happen_at, item.amount] as [string, number]
      );
    });
    onMounted(async () => {
      const response = await http.get<{ groups: Data1; summary: Number }>(
        "/items/summary",
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          kind: kind.value,
          _mock: "itemSummary",
        }
      );
      originalData.value = response.data.groups;
      console.log(lineData.value);
    });

    return () => (
      <div class={s.wrapper}>
        <FormItem
          label="类型"
          type="select"
          options={[
            { value: "expenses", text: "支出" },
            { value: "income", text: "收入" },
          ]}
          v-model={kind.value}
        />
        <LineChart data={lineData.value} />
        <PieChart />
        <Bars />
      </div>
    );
  },
});

