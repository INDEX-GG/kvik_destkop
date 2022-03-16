import React from "react";
import {Box} from "@material-ui/core";
import Link from 'next/link'

import AccountTabItem from '../AccountTabItem/AccountTabItem'

const AccountTabItemLink = ({title, href, icons, hrefShort}) => {

    return (
        <Box component='li'>
            <Link href={href}>
                <a>
                    <AccountTabItem
                        title={title}
                        icons={icons}
                        hrefShort={hrefShort}
                    />
                </a>
            </Link>
        </Box>
    )
}

export default React.memo(AccountTabItemLink);
