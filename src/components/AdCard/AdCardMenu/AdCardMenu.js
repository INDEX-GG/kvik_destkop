import React from 'react'
import { Menu, MenuItem } from "@material-ui/core";

const AdCardMenu = ({offer_id, openMenu, setOpenMenu, initialState}) => {

  return (
    <Menu
      open={openMenu.mouseY !== null}
      onClose={() => setOpenMenu(initialState)}
      anchorReference="anchorPosition"
      anchorPosition={
        openMenu.mouseY !== null && openMenu.mouseX !== null
          ? { top: openMenu.mouseY, left: openMenu.mouseX }
          : undefined
      }
    >
				<MenuItem onClick={() => setOpenMenu(initialState)} component='a' target='_blank' href={`/product/${offer_id}`}>Открыть в новой вкладке</MenuItem>
				<MenuItem>Добавить в избранное</MenuItem>
				<MenuItem>Добавить к сравнению</MenuItem>
				<MenuItem>Не показывать</MenuItem>
    </Menu>
  )
}

export default React.memo(AdCardMenu)
