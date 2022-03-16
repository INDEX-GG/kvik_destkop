import React, { useMemo, useState, useEffect } from "react"
import { useRouter } from "next/router"

import { useAuth } from "#lib/Context/AuthCTX"
import { getTokenDataByPost } from "#lib/fetch"
import { CHAT_URL_API } from "#lib/constants"

import AccountProvider from "../../../src/context/AccountContext"
import AccountPage from "../../../src/components/Account/AccountPage"
import MessagesNotifications from "../../../src/components/Account/Messages/MessagesNotifications/MessagesNotifications"
import MessagesRooms from "../../../src/components/Account/Messages/MessagesRooms/MessagesRooms"

import Switch from '../../../src/components/AnyPage/Switch/Switch'

const Index = () => {
	const router = useRouter()
	const { id, token } = useAuth()

	const [state, setState] = useState()

	const query = useMemo(() => router.query.content, [router.query])

	useEffect(() => {
		if (id) {
			getTokenDataByPost(
				`${CHAT_URL_API}/chat_last_messages`,
				{ user_id: id },
				token
			).then((r) => {
				if (r.data?.length) {
					getTokenDataByPost(`/api/roomInfo`, r.data, token).then((r) => {
						setState(r.list)
					})
				}
			})
		}
	}, [id, token])

	const tabs = useMemo(
        () => [
			{
				href: "/accountV2/message?content=rooms",
				nameContent: "rooms",
				title: "Сообщения",
				count: state?.length || "",
			},
			{
				href: "/accountV2/message?content=notification",
				nameContent: "notification",
				title: "Уведомления",
				count: "",
			},
    ], [state])

	return (
		<AccountProvider>
			<AccountPage tabs={tabs} >
                <Switch test={query}>
                    <MessagesNotifications
                        testValue={"notification"}
                        />
                    <MessagesRooms
                        testValue={"rooms"}
                        data={state}
                    />
                </Switch>
			</AccountPage>
		</AccountProvider>
	)
}

export default Index
