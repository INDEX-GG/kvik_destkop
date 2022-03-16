import { PersonalDataDesktop } from '#components/account/Settings/tabs/PersonalData/desktop'
import { PersonalDataMobile } from '#components/account/Settings/tabs/PersonalData/mobile'
import React from 'react'

import {useAccountContext} from '../../../../context/AccountContext'
import AccountBody from '../../AccountWrappers/AccountBody/AccountBody'
// import {useSettingsPersonalDataStyles} from './style'

const SettingsPersonalData = () => {
    // const classes = useSettingsPersonalDataStyles()

    const {
        isMobile
    } = useAccountContext();

    // TODO: переписать настройки пользователя
    return (
        <AccountBody>
            {isMobile ? <PersonalDataMobile /> : <PersonalDataDesktop />}
        </AccountBody>
    )
}

export default React.memo(SettingsPersonalData)
