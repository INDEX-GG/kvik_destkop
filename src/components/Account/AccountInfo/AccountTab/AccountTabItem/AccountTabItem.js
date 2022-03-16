import React, {useMemo} from "react"
import { Box } from "@material-ui/core"
import clsx from "clsx"

import {useCustomRouter} from '../../../../../hook/globalHooks/useCustomRouter'

import { useAccountTabItemStyles } from "./style"

const AccountTabItem = ({ title, onClick = null, hrefShort, icons }) => {
	const classes = useAccountTabItemStyles(icons)
    const {compare} = useCustomRouter()

    const isActive = useMemo(
        () => compare(hrefShort),
        [hrefShort]
    )

	return (
		<Box component="li" onClick={onClick}>
			<Box
				className={clsx(classes.tabItem, {
					[classes.tabItemActive]: isActive,
				})}
			>
				<Box
					component="span"
					className={clsx(classes.tabIcon, {
						[classes.tabIconActive]: isActive,
					})}
				/>
				<Box component="span" className={classes.tabTitle}>
					{title}
				</Box>
			</Box>
		</Box>
	)
}

export default React.memo(AccountTabItem)
