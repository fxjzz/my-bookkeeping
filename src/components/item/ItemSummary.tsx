import { defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '../../shared/Button'
import { Datetime } from '../../shared/DateTime'
import { FloatButton } from '../../shared/FloatButton'
import { http } from '../../shared/Http'
import { Money } from '../../shared/Money'
import s from './ItemSummary.module.scss'
import p from '@images/picture.png'

export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>
    },
    endDate: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const items = ref<Item[]>([])
    const hasMore = ref(false)
    const page = ref(0)
    const fetchItemsBalance = async () => {
      if (!props.startDate || !props.endDate) return
      const response = await http.get(
        '/items/balance',
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          page: page.value + 1
        },
        {
          _mock: 'itemIndexBalance',
          _autoLoading: true
        }
      )
      Object.assign(itemsBalance, response.data)
    }
    const fetchItems = async () => {
      if (!props.startDate || !props.endDate) return
      const response = await http.get<Resources<Item>>(
        '/items',
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          page: page.value + 1
        },
        {
          _mock: 'itemIndex',
          _autoLoading: true
        }
      )
      const { resources, pager } = response.data
      items.value?.push(...resources)
      hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
      page.value += 1
    }
    onMounted(fetchItems)
    watch(
      () => [props.startDate, props.endDate],
      () => {
        items.value = []
        hasMore.value = false
        page.value = 0
        fetchItems()
        Object.assign(itemsBalance, {
          expenses: 0,
          income: 0,
          balance: 0
        })
        fetchItemsBalance()
      }
    )
    const itemsBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0
    })
    onMounted(fetchItemsBalance)
    return () => (
      <div class={s.wrapper}>
        {items.value.length > 0 ? (
          <>
            <ul class={s.total}>
              <li>
                <span>收入</span>
                <Money value={itemsBalance.income} />
              </li>
              <li>
                <span>支出</span>
                <Money value={itemsBalance.expenses} />
              </li>
              <li>
                <span>净收入</span>
                <Money value={itemsBalance.balance} />
              </li>
            </ul>
            <ol class={s.list}>
              {items.value.map((item) => (
                <li>
                  <div class={s.sign}>
                    <span>{item.tags![0].sign}</span>
                  </div>
                  <div class={s.text}>
                    <div class={s.tagAndAmount}>
                      <span class={s.tag}>{item.tag_ids[0]}</span>
                      <span class={s.amount}>
                        ￥<Money value={item.amount} />
                      </span>
                    </div>
                    <div class={s.time}>
                      <Datetime value={item.happen_at} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div class={s.more}>
              {hasMore.value ? <Button onClick={fetchItems}>加载更多</Button> : <span>没有了</span>}
            </div>
          </>
        ) : (
          <div class={s.center}>
            <img src={p} class={s.p} />
          </div>
        )}
        <RouterLink to={'/items/create'}>
          <FloatButton />
        </RouterLink>
      </div>
    )
  }
})
