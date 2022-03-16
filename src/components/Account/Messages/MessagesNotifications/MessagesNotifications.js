import React from "react"
import {Box} from '@material-ui/core'

import MessagesNotificationItem from './MessagesNotificationItem/MessagesNotificationItem'
import AccountBody from "../../AccountWrappers/AccountBody/AccountBody"
import EmptyPlaceholder from "#components/EmptyPlaceholder";

import {useMessagesNotificationsStyle} from './style'
import { checkValidArray } from 'src/services/services';

const MessagesNotifications = ({data}) => {
    const classes = useMessagesNotificationsStyle()

	return (
        <AccountBody>
            <Box className={classes.notifWrapper}>
                {checkValidArray(data) ? data.map(item => (
                    <MessagesNotificationItem
                        key={item.id}
                        date={item.date}
                        msg={item.mess}
                        time={item.time}
                    />
                )): <EmptyPlaceholder title="Здесь будут ваши уведомления" />}
            </Box>
        </AccountBody>
    )
}

export default React.memo(MessagesNotifications)
