import React, {useMemo} from 'react'
import {Box, Typography} from "@material-ui/core";

import {checkActiveString} from "../../../services/services";

import {useScrollPostDataHeaderStyle} from './style'
import OffersRenderGridIcon from '#UI/icons/OffersRenderGridIcon';
import OffersRenderListIcon from '#UI/icons/OffersRenderListIcon';

const ScrollPostDataHeader = ({isGrid, setGridView, isMobile}) => {

  const classes = useScrollPostDataHeaderStyle()

  const iconColor = useMemo(
    () => checkActiveString(isGrid, '#5a5a5a', '#8f8f8f'),
    [isGrid]
  )

  const handlerChangeGrid = () => {setGridView(prevState => !prevState)}

  return (
    <Box className={classes.similarDataHeader}>
      <Typography  variant='h2'>Похожие объявления</Typography>
      {isMobile && (
        <Box>
            {/* TODO: svg обернуть в box, для увеличения области клика */}
            <OffersRenderGridIcon clickHandler={handlerChangeGrid} color={iconColor} />
            <OffersRenderListIcon clickHandler={handlerChangeGrid} color={iconColor}/>
      </Box>
      )}
    </Box>
  )
}

export default React.memo(ScrollPostDataHeader)
