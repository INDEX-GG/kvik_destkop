import { useEffect, useState } from 'react';
import axios from 'axios';

export function useOutherUser(user_id) {
    const user = {user_id: +user_id, page: 1, page_limit: 50},
    [userInfo, setUserInfo] = useState({}),
    [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getOutherUser = async() => {
          await axios.post('/api/getSeller', user)
          .then((res) => {
              setUserInfo({...res.data.seller, isLoading: false})
              setLoading(false);
          })
        }

        if (typeof user_id !== undefined && user_id !== null && !isNaN(user_id)) {
          getOutherUser()
        }

    }, [user_id])

  return {
    ...userInfo,
    isLoading,
  }
}
