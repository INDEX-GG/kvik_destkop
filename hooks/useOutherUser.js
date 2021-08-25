import { useEffect, useState } from 'react';
import axios from 'axios';

export function useOutherUser(user_id) {
    const user = {id: +user_id},
    [userInfo, setUserInfo] = useState({}),
    [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getOutherUser = async() => {
          const data = await axios.post('/api/getUser', user)
          .then((res) => {
              setUserInfo({
              sellerId: user.id,
              sellerName: res.data.name,
              sellerPhoto: res.data.userPhoto,
              createdAt: res.data.createdAt,
              raiting: res.data.raiting,
              sellerPhone: res.data.phone
              })
              setLoading(false);
          })
        }

        if (user_id != undefined) {
          getOutherUser()
        }
        
    }, [user_id])

  return {
    ...userInfo,
    isLoading,
  }
}