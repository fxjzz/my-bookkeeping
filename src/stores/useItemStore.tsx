import { defineStore } from 'pinia'
import { http } from '../shared/Http'

// const items = ref<Item[]>([])
// const hasMore = ref(false)
// const page = ref(0)
type itemState = {
  items: Item[]
  hasMore: boolean
  page: number
}
type Actions = {
  reset: () => void
  fetchItems: (startDate?: string, endDate?: string) => void
}
export const useItemStore = (start?: string, end?: string) =>
  defineStore<string, itemState, {}, Actions>(`items-${start}-${end}`, {
    state: () => ({
      items: [],
      hasMore: false,
      page: 0
    }),
    actions: {
      reset() {
        this.items = []
        this.hasMore = false
        this.page = 0
      },
      async fetchItems(startDate, endDate) {
        if (!startDate || !endDate) return
        const response = await http.get<Resources<Item>>(
          '/items',
          {
            happen_after: startDate,
            happen_before: endDate,
            page: this.page + 1
          },
          {
            _mock: 'itemIndex',
            _autoLoading: true
          }
        )
        const { resources, pager } = response.data
        this.items.push(...resources)
        this.hasMore = (pager.page - 1) * pager.per_page + resources.length < pager.count
        this.page += 1
      }
    }
  })()
