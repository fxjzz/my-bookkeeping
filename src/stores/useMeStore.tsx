import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { http } from '../shared/Http'

type MeState = {
  mePromise?: Promise<AxiosResponse<Resource<User>>>
}

type MeActions = {
  refreshMe: () => void
  fetchMe: () => void
}

export const useMeStore = defineStore<string, MeState, {}, MeActions>('me', {
  state: () => ({
    mePromise: undefined
  }),
  actions: {
    refreshMe() {
      this.mePromise = http.get<Resource<User>>('/me')
    },
    fetchMe() {
      this.refreshMe()
    }
  }
})
