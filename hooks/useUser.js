import useSWR from 'swr';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function useUser() {
  const { data: user, mutate: mutateUser } = useSWR('/api/user'),
    [isAuth, setIsAuth] = useState(false),
    [userInfo, setUserInfo] = useState({}),
    [isLoading, setLoading] = useState(true);
  useEffect(() => {
    user && setIsAuth(user.isAuth)
    isAuth && axios.post('/api/getUser', user)
      .then((res) => {
        setUserInfo({
          id: user.id,
          username: res.data.user.name,
          photo: res.data.user.userPhoto,
          about: res.data.user.about,
          createdAt: res.data.user.createdAt,
          phone: res.data.user.phone,
          email: res.data.user.email,
          raiting: res.data.user.raiting,
        })
        setLoading(false);
      })
  }, [user, isAuth])

  return {
    isAuth,
    ...userInfo,
    isLoading,
    mutateUser
  }
}