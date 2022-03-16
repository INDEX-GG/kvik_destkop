import React from 'react'
import {Box} from '@material-ui/core'

import {useAccountBodyStyles} from './style'

const AccountBody = ({children}) => {
    const classes = useAccountBodyStyles()

    return (
        <Box className={classes.accountBody}>
            <Box className={classes.accountContent}>
                {children}
            </Box>
        </Box>
    )
}

export default React.memo(AccountBody)
