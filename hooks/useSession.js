import useSWR from 'swr';
export function useSession() {
    const { data: user, mutate: mutateUser } = useSWR('/api/user');
    return {user, mutateUser}
}