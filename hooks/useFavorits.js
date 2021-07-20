import { useEffect, useState } from 'react';
import axios from 'axios';

export function useFavorits(id) {

    const [userFavorite, setUserFavorite] = useState({})
    const [isLoading, setLoading] = useState(true);
    let arrFavorits = { 'user_id': `${id}` };
    useEffect(() => {
        axios.post("/api/getFavorites", arrFavorits)
            .then((res) => {
                res.data.map((item, i) => {
                    setUserFavorite({
                        productId: item.id,
                        address: item.address,
                        archived_time: item.archived_time,
                        photo: item.photo,
                        price: item.price,
                        i: i,
                        items: item
                    })
                })
                setLoading(false)
            })

    }, [isLoading])
    return {
        ...userFavorite,
        isLoading

    }
}

