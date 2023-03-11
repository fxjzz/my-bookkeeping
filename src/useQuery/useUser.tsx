import { useQuery } from 'vue-query'
import { http } from '../shared/Http'

const fetchUser = async () => {
  const res = await http.get<Resource<User>>('/me')
  return res.data.resource
}

export default function useUser() {
  return useQuery('userStatus', fetchUser, {
    retry: 0,
    refetchInterval: 600000 //60*10*1000 十分钟检查一次用户登录状态
  })
}
