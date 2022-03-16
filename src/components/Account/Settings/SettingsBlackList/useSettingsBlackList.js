export const useSettingsBlackList = () => {

    const getCardId = ({id, isCheck}) => {
        console.log(id, isCheck)
        // setCardId(
        //     isCheck
        //         ? (prev) => [...prev, id]
        //         : (prev) => prev.filter((item) => item !== id)
        // )
    }

    /**
	 * @param {string | string[]} users
	 * @returns
	 */
	const updateBlackList = (users) => {
		if (Array.isArray(users)) {
			// setBlackListData(arr => arr.filter(el => !users.includes(el.id)))
			return
		}
		// setBlackListData(arr => arr.filter(el => el.id !== users))
	}

    /**
	 * @param {string[] | string} usersUnlock
	 */
	const unblockUsers = async (usersUnlock) => {
		updateBlackList(usersUnlock)

        // TODO: старые api, новые еще не завезли
		if (Array.isArray(usersUnlock)) {
			for (let user of usersUnlock) {
                console.log(user)
				// await blockUser(userID, user, false, token)
			}
		} else {
			// await blockUser(userID, usersUnlock, false, token)
		}

	}

    return {
        getCardId,
        updateBlackList,
        unblockUsers
    }
}
