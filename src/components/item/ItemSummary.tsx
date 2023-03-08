import { defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '../../shared/Button'
import { Datetime } from '../../shared/DateTime'
import { FloatButton } from '../../shared/FloatButton'
import { http } from '../../shared/Http'
import { Money } from '../../shared/Money'
import s from './ItemSummary.module.scss'
import p from '@images/picture.png'
import { useAfterMe } from '../../hooks/useAfterMe'
import { useItemStore } from '../../stores/useItemStore'

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
    const itemStore = useItemStore(props.startDate, props.endDate)
    const fetchItemsBalance = async () => {
      if (!props.startDate || !props.endDate) return
      const response = await http.get(
        '/items/balance',
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          page: itemStore.page + 1
        },
        {
          _mock: 'itemIndexBalance',
          _autoLoading: true
        }
      )
      Object.assign(itemsBalance, response.data)
    }
    useAfterMe(() => itemStore.fetchItems(props.startDate, props.endDate))
    watch(
      () => [props.startDate, props.endDate],
      () => {
        itemStore.reset()
        itemStore.fetchItems()
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
    useAfterMe(fetchItemsBalance)
    return () => (
      <div class={s.wrapper}>
        {itemStore.items.length > 0 ? (
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
              {itemStore.items.map((item) => (
                <li>
                  <div class={s.sign}>
                    <span>{item.tags![0].sign}</span>
                  </div>
                  <div class={s.text}>
                    <div class={s.tagAndAmount}>
                      <span class={s.tag}>{item.tags![0].name}</span>
                      <span class={s.amount}>
                        {`${item.kind === 'expenses' ? '-' : '+'}`}￥<Money value={item.amount} />
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
              {itemStore.hasMore ? (
                <Button onClick={() => itemStore.fetchItems()}>加载更多</Button>
              ) : (
                <span>没有了</span>
              )}
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
