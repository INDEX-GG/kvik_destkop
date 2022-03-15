import React from "react";
import {Box} from "@material-ui/core";
import {useAccountTabItemStyles} from './style';
import Link from 'next/link'

const AccountTabItem = ({title, href, icon}) => {

    const classes = useAccountTabItemStyles()
    const IconComponent = icon

    return (
        <Box component='li'>
            <Link href={href}>
                <a>
                    <Box className={classes.tabItem}>
                        {icon && (
                            <Box component='span' className={classes.tabIcon}>
                                <IconComponent/>
                            </Box>
                        )}
                        <Box component='span' className={classes.tabTitle}>
                            {title}
                        </Box>
                    </Box>
                </a>
            </Link>
        </Box>
    )
}

export default React.memo(AccountTabItem);
