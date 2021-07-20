import { useEffect, useState } from 'react';
import axios from 'axios';

export function useOutherUser(user_id, subscription = false) {
    const user = {id: +user_id},
    [userInfo, setUserInfo] = useState({}),
    [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.post('/api/getUser', user)
        .then((res) => {
            setUserInfo({
            id: user.id,
            username: res.data.user.name,
            photo: res.data.user.userPhoto,
            createdAt: res.data.user.createdAt,
            raiting: res.data.user.raiting,
            subscription: false
            })
            setLoading(false);
        })
    }, [user_id])

  return {
    ...userInfo,
    isLoading,
  }
}