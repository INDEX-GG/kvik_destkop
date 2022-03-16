import React from 'react'
import {Box} from '@material-ui/core'

import AccountBody from '../../AccountWrappers/AccountBody/AccountBody'
import SettingsBlackListPlaceHolder from './../../../../../components/placeHolders/SettingsPlaceHolder/SettingsBlackListPlaceHolder/SettingsBlackListPlaceHolder';

import {checkValidArray} from '../../../../services/services'

import {useSettingsBlackListStyles} from './style'
import BlackListCard from '#components/account/Settings/card/BlackListCard';
import EmptyPlaceholder from '#components/EmptyPlaceholder';

const SettingsBlackList = ({data = []}) => {
    const classes = useSettingsBlackListStyles()

    return (
        <>
            {data.length !== 0 ? (
                <AccountBody>
                    <Box className={classes.settingsBlackList}>
                        {checkValidArray(data) && data.map((item, i) => (
                            <BlackListCard
                                key={i}
                                data={item}
                                // parentCheck={check}
                                // getCardId={getCardId}
                                // dataCardId={dataCardId}
                                // unblockUser={unblockUser}
                            />
                        ))}
                    </Box>
                </AccountBody>
            ) : (
                !data
                    ? <SettingsBlackListPlaceHolder />
                    : <Box className={classes.emptyPlaceHolder}>
                        <EmptyPlaceholder
                            title="Здесь будут заблокированные вами пользователи"
                            subtitle='Нажмите пожаловаться в открывшемся меню выберете "Заблокировать пользователя"'
                            img="/accountImage/BigBlackList.png"
                            customClass="blackList"
                            imgAlt="search_placeholder"
                        />
                    </Box>
            )
        }
        </>
    )
}

export default React.memo(SettingsBlackList)
