import React from "react"
import {Box} from '@material-ui/core'

const MessagesNavButtons = () => {
	return (
		<Box className="clientPage__container_nav__radio">
			<a>Удалить</a>
			<a>Заблокировать</a>
		</Box>
	)
}

export default React.memo(MessagesNavButtons)
