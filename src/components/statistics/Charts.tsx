import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { FormItem } from '../../shared/Form'
import s from './Charts.module.scss'
import { Bars } from './Bars'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'
import { http } from '../../shared/Http'
import { Time } from '../../shared/time'

type DataItem = { happen_at: string; amount: number }
type Data1 = DataItem[]
type Data2Item = { tag_id: number; tag: Tag; amount: number }
type Data2 = Data2Item[]

const DAY = 24 * 3600 * 1000

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false
    },
    endDate: {
      type: String as PropType<string>,
      required: false
    }
  },
  setup: (props, context) => {
    const kind = ref('expenses')
    const originalData = ref<Data1>([])
    const lineData = computed<[string, number][]>(() => {
      if (!props.startDate || !props.endDate) {
        return []
      }
      const diff = new Date(props.endDate).getTime() - new Date(props.startDate).getTime()
      const n = diff / DAY + 1
      return Array.from({ length: n }).map((_, i) => {
        const time = new Time(props.startDate + 'T00:00:00.000+0800').add(i, 'day').getTimestamp() //每一天
        //原数组存在日期，则替换
        const item = originalData.value[0]
        const amount = item && new Date(item.happen_at).getTime() === time ? originalData.value.shift()!.amount : 0
        return [new Date(time).toISOString(), amount]
      })
    })
    const data2 = ref<Data2>([])
    const betterData2 = computed<{ name: string; value: number }[]>(() =>
      data2.value.map((item) => ({
        name: item.tag.name,
        value: item.amount
      }))
    )
    const betterData3 = computed<{ tag: Tag; amount: number; percent: number }[]>(() => {
      const total = data2.value.reduce((sum, item) => sum + item.amount, 0)
      return data2.value.map((item) => ({
        ...item,
        percent: Math.round((item.amount / total) * 100)
      }))
    })
    const fetchData1 = async () => {
      const response = await http.get<{ groups: Data1; summary: Number }>('/items/summary', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        kind: kind.value,
        group_by: 'happen_at',
        _mock: 'itemSummary'
      })
      originalData.value = response.data.groups
    }
    const fetchData2 = async () => {
      const response = await http.get<{ groups: Data2; summary: number }>('/items/summary', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        kind: kind.value,
        group_by: 'tag_id',
        _mock: 'itemSummary'
      })
      data2.value = response.data.groups
    }
    onMounted(fetchData1)
    onMounted(fetchData2)
    watch(
      () => kind.value,
      () => {
        fetchData1()
        fetchData2()
      }
    )

    return () => (
      <div class={s.wrapper}>
        <FormItem
          label="类型"
          type="select"
          options={[
            { value: 'expenses', text: '支出' },
            { value: 'income', text: '收入' }
          ]}
          v-model={kind.value}
        />
        {kind.value}
        <LineChart data={lineData.value} />
        <PieChart data={betterData2.value} />
        <Bars data={betterData3.value} />
      </div>
    )
  }
})
