import React from "react"
import {Box} from '@material-ui/core'

import {useMessagesNotificationItemStyle} from './style'

const MessagesNotificationItem = ({date, msg, time}) => {
    const classes = useMessagesNotificationItemStyle()

	return (
        <Box className={classes.notifItemContainer}>
            <Box className={classes.notifItemDate}>{date}</Box>
            <Box className={classes.notifItemMsg}>{msg}</Box>
            <Box className={classes.notifItemTime}>{time}</Box>
        </Box>
    )
}

export default React.memo(MessagesNotificationItem)
