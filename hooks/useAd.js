import { useEffect, useState } from 'react';
import axios from 'axios'

export function useAd(id) {

    const [userInfo, setUserInfo] = useState({}),
        [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
			axios.post('/api/getProductOfUser', { user_id: id })
            .then((res) => {
                setUserInfo(res.data.result)
                setLoading(false);
            })
		}
    }, [id])
    return {
        userInfo,
        isLoading
    }
}

