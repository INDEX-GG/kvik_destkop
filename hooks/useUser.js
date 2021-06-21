import useSWR from 'swr'

export function useUser() {
  const { data: user, mutate: mutateUser } = useSWR('/api/user')

  return { user, mutateUser }
}