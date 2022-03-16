import React from "react";
import {Box} from "@material-ui/core";

import AccountTabItem from './AccountTabItem/AccountTabItem'
import AccountTabItemLink from "./AccountTabItemLink/AccountTabItemLink";

import AccountTabArray from './AccountTab.json'

import {useAccountTabStyles} from './style';

const AccountTab = () => {

    const classes = useAccountTabStyles()

    const handlerLogoutClick = () => {
        // TODO: добавить логаут
        console.log('выполнили логаут')
    }

    return (
        <Box className={classes.tabContainer} component='ul'>
            {AccountTabArray.tabs.map(tab => (
                <AccountTabItemLink
                    key={tab.href}
                    href={tab.href}
                    title={tab.title}
                    icons={tab.icons}
                    hrefShort={tab.hrefShort}
                />
            ))}
            <AccountTabItem
                {...AccountTabArray.exit}
                onClick={handlerLogoutClick}
            />
        </Box>
    )
}

export default React.memo(AccountTab);
