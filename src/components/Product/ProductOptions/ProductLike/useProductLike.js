import {useState, useEffect} from "react";
import {useStatistics} from "#lib/Context/StatisticsCTX";
import {useStore} from "#lib/Context/Store";

export const useProductLike = (productID) => {

    const [isLike, setIsLike] = useState(false);
    const {addLike, addUnLike} = useStatistics()
    const {userInfo} = useStore();

    // Лакнут ли пост
    useEffect(() => {
        if (userInfo && productID) {
            const favorites = userInfo?.favorites

            if (Array.isArray(favorites)) {
                const findLike = favorites.find(adLike => adLike === productID);

                if (findLike) {
                    setIsLike(true)
                } else {
                    setIsLike(false)
                }
            }
        }
    }, [productID])

    // Добавить / удалить лайк
    const handleChangeLike = () => {
        if (userInfo) {
            if (isLike) {
                addUnLike(productID)()
                setIsLike(false)
            }
            if (!isLike) {
                addLike(productID)()
                setIsLike(true)
            }
        }
    }



    return {
        isLike,
        handleChangeLike
    }
}
