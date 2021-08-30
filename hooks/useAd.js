import { useEffect, useState } from 'react';
import { getDataByPost } from '../lib/fetch';

export function useAd(id) {

    const [userInfo, setUserInfo] = useState({}),
        [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
			getDataByPost('/api/getProductOfUser', { user_id: id })
            .then((res) => {
                setUserInfo(res)
                setLoading(false);
            })
		}
    }, [id])
    return {
        userInfo,
        isLoading
    }
}

