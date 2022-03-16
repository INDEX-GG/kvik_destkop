import React from 'react'
import {Box} from '@material-ui/core'

import notificationArr from './SettingsNotificationData.json'
import AccountBody from '../../AccountWrappers/AccountBody/AccountBody'
import SettingsNotifItem from './SettingsNotifItem/SettingsNotifItem'

import {useSettingsNotificationStyles} from './style'

const SettingsNotification = () => {
    const classes = useSettingsNotificationStyles()

    return (
        <AccountBody>
            <Box className={classes.settingsNotifWrapper}>
                {notificationArr.map(item => (
                    <SettingsNotifItem
                        key={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                    />
                ))}
            </Box>
        </AccountBody>
    )
}

export default React.memo(SettingsNotification)
