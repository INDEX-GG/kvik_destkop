import {useMemo, useState, useEffect} from "react";
import {useStore} from "#lib/Context/Store";
import {useStatistics} from "#lib/Context/StatisticsCTX";

export const useProductUserMiniatureSubscribe = (sellerId) => {
    const {userInfo} = useStore()
    const {addSubscribers, addUnsubscribe} = useStatistics()

    const [isSubscribe, setIsSubscribe] = useState(false);
    const tooltipTitle = useMemo(() => isSubscribe ? 'Отписаться' : 'Подписаться', [isSubscribe])

    const subscriptionsArr = useMemo(() => {
        if (userInfo) return userInfo?.subscriptions
    }, [userInfo])

    const isSubscriptionUser = useMemo(() => {
        if (Array.isArray(subscriptionsArr)) {
            return subscriptionsArr.find(subscription => subscription === sellerId)
        }
    }, [subscriptionsArr])

    useEffect(() => {
        if (isSubscriptionUser) {
            setIsSubscribe(true)
        } else {
            setIsSubscribe(false);
        }
    }, [isSubscriptionUser])


    const handleChangeSubscribe = () => {
        if (sellerId && userInfo) {
            if (isSubscribe) {
                setIsSubscribe(false)
                addUnsubscribe(sellerId)()
            } else {
                setIsSubscribe(true)
                addSubscribers(sellerId)()
            }
        }
    }

    return {
        isSubscribe,
        tooltipTitle,
        handleChangeSubscribe
    }
}
