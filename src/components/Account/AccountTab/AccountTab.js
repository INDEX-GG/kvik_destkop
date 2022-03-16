import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { Box } from '@material-ui/core'
import clsx from 'clsx'

import {checkValidArray} from '../../../services/services'
import {useAccountTabStyles} from './style'

/**
 *
 * @returns
 */
const AccountTab = ({tabs = {}}) => {
    const classes = useAccountTabStyles()
    const router = useRouter();

    return (
        <Box className={classes.containerTop}>
            <Box className={classes.containerNavWrapper}>
                <Box component='nav' className={classes.containerNav}>
                    {checkValidArray(tabs) && tabs.map(item => (
                        <Link href={item.href} key={item.href}>
                            <a className={clsx(classes.containerNavTitle, {
                                [classes.navActive]: router?.query?.content === item.nameContent
                            })}>
                                {item.title} {item.count}
                            </a>
                        </Link>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default React.memo(AccountTab)
