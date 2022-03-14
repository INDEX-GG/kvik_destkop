import React, { useMemo } from "react"
import { Box, Typography } from "@material-ui/core"

import { useProductNoActiveStyles } from "./style"

const ProductNoActive = ({ status }) => {
	const classes = useProductNoActiveStyles()

	const ProductNoActiveByType = {
		no_active: "Объявление снято с публикации",
		time_limit: "Истек срок размещения",
	}

	const showBlock = useMemo(
		() => status === "no_active" || status === "time_limit",
		[status]
	)

	const labelBlock = Object.prototype.hasOwnProperty.call(ProductNoActiveByType,status) ? ProductNoActiveByType[status] : ""

	return (
		<>
			{showBlock && (
				<Box className={classes.noActiveBlock}>
					<Typography className={classes.labelBlock}>{labelBlock}</Typography>
				</Box>
			)}
		</>
	)
}

export default React.memo(ProductNoActive)
