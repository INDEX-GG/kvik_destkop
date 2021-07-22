import { useEffect, useState } from 'react';
import axios from 'axios';

export function useOutherUser(user_id) {
    const user = {id: +user_id},
    [userInfo, setUserInfo] = useState({}),
    [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.post('/api/getUser', user)
        .then((res) => {
            setUserInfo({
            sellerId: user.id,
            sellerName: res.data.user.name,
            sellerPhoto: res.data.user.userPhoto,
            createdAt: res.data.user.createdAt,
            raiting: res.data.user.raiting,
            })
            setLoading(false);
        })
    }, [user_id])

  return {
    ...userInfo,
    isLoading,
  }
}