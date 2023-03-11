import { useQuery } from 'vue-query'
import { http } from '../shared/Http'

const fetchUser = async () => {
  const response = await http.get('/me')
}

export default function useUsers() {
  const { data: users, isFetching } = useQuery('users', fetchUser)
  return { users, isFetching }
}
