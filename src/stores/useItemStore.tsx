import { defineStore } from 'pinia'
import { http } from '../shared/Http'
import { Time } from '../shared/time'

type itemState = {
  items: Item[]
  hasMore: boolean
  page: number
}
type Actions = {
  _fetch: (firstPage: boolean, startDate?: string, endDate?: string) => void
  fetchItems: (startDate?: string, endDate?: string) => void
  fetchNextPage: (startDate?: string, endDate?: string) => void
}

export const useItemStore = (start?: string, end?: string) =>
  defineStore<string, itemState, {}, Actions>(`items-${start}-${end}`, {
    state: () => ({
      items: [],
      hasMore: false,
      page: 0
    }),
    actions: {
      async _fetch(firstPage?: boolean, startDate?: string, endDate?: string) {
        const end = new Time(endDate).add(1, 'day').format()
        if (!startDate || !endDate) return
        const response = await http.get<Resources<Item>>(
          '/items',
          {
            happen_after: startDate,
            happen_before: end,
            page: firstPage ? 1 : this.page + 1
          },
          {
            _mock: 'itemIndex',
            _autoLoading: true
          }
        )
        const { resources, pager } = response.data
        if (firstPage) {
          this.items = resources
        } else {
          this.items.push(...resources)
        }
        this.hasMore = (pager.page - 1) * pager.per_page + resources.length < pager.count
        this.page += 1
        this.items.sort((a, b) => {
          const a1 = new Date(a.happen_at).getTime()
          const b1 = new Date(b.happen_at).getTime()
          if (a1 > b1) {
            return 1
          } else {
            return -1
          }
        })
      },
      async fetchNextPage(startDate?: string, endDate?: string) {
        this._fetch(false, startDate, endDate)
      },
      async fetchItems(startDate, endDate) {
        this._fetch(true, startDate, endDate)
      }
    }
  })()
