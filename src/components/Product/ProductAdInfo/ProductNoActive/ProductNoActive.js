import React, {useMemo} from "react"
import { Box, Typography } from "@material-ui/core"

import { useProductNoActiveStyles } from "./style"

const ProductNoActive = ({ isMyAd, isOpacity, status }) => {
	const classes = useProductNoActiveStyles()

	const ProductNoActiveByType = {
		no_active: "Объявление снято с публикации",
		time_limit: "Истек срок размещения",
        banned: "Объявление заблокировано",
	}

	const labelBlock = useMemo(
        () => Object.prototype.hasOwnProperty.call(ProductNoActiveByType, status)
            ? (isMyAd
                ? ProductNoActiveByType[status]
                : ProductNoActiveByType.no_active)
            : "",
        [isMyAd, status]
    )

	return (
		<>
			{isOpacity && (
				<Box className={classes.noActiveBlock}>
					<Typography className={classes.labelBlock}>{labelBlock}</Typography>
				</Box>
			)}
		</>
	)
}

export default React.memo(ProductNoActive)
