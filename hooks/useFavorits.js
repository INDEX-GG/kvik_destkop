import { useEffect, useState } from 'react';
import {getTokenDataByPost} from "../lib/fetch";
import {useAuth} from "../lib/Context/AuthCTX";

export function useFavorits(id) {

    const [userFavorite, setUserFavorite] = useState({})
    const [isLoading, setLoading] = useState(true);
    const {token} = useAuth();
    let arrFavorits = { 'user_id': `${id}` };
    useEffect(() => {
        getTokenDataByPost("/api/getFavorites", arrFavorits, token)
            .then((res) => {
                setUserFavorite(res
                )

                // res.data.map((item, i) => { 
                //     setUserFavorite({
                //         // productId: item[0].id,
                //         // address: item[0].address,
                //         // archived_time: item[0].archived_time,
                //         // photo: item[0].photo,
                //         // price: item[0].price,
                //         i: i+1,
                //         itemsPost: item[0],
                //         // userName: item[1].name,
                //         // user_id: item[1].id,
                //         itemsUser: item[1],
                //     })
                // })
                setLoading(false)
            })

    }, [isLoading])
    return {
        userFavorite,
        isLoading

    }
}

