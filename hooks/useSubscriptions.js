import {useEffect, useState} from "react"
import axios from "axios"

/**
 * !NOTICE - не используется (старая api)
 * @param {*} user_id
 * @returns
 */
export function useSubList(user_id) {
    const user = {user_id: String(user_id)},
    [userInfo, setUserInfo] = useState({}),
    [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (user.user_id != 'undefined') {
			axios.post("/api/getSubscriptions", user)
			.then((res) => {
				setUserInfo({
					subList: res.data
				})
				setLoading(false);
			})
		}
    }, [user_id])

    return {
        ...userInfo,
        isLoading
    }
}


/**
 * !NOTICE - не используется (старая api)
 * @param {*} user_id, seller_id
 * @returns
 */
export function useSubBool(user_id, seller_id) {
    const user = {user_id: String(user_id)},
    [userInfo, setUserInfo] = useState({}),
    [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (user.user_id != 'undefined') {
			axios.post("/api/getSubscriptions", user)
			.then((res) => {
				setUserInfo(res.data)
				setLoading(false);
			})
		}
    }, [user_id])
    if (userInfo.length > 0) {
        if (userInfo && userInfo?.filter(item => item.id == seller_id).length > 0) {
            return {
                userSub: true,
                userLoading: isLoading
            }
        } else {
            return {
                userSub: false,
                userLoading: isLoading
            }
		}
    } else {
        return {isLoading}
    }
}
