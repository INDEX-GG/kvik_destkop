import React, {useMemo} from 'react'
import {Box} from "@material-ui/core";

import ScrollEnd from '../../ScrollEnd/ScrollEnd'
import AdCard from '../../AdCard/AdCard'

import {checkActiveClass} from '../../../services/services'

import {useRenderCardsStyle} from './style'

const RenderCards = ({renderCards, isGrid, isMobile, limitShow, currentLimit}) => {

  const classes = useRenderCardsStyle()

  const renderCardsClasses = useMemo(
    () => checkActiveClass(
      !isGrid && isMobile,
      classes.gridView,
      [classes.gridView, classes.defaultViewMobile]
    ),
    [isGrid, isMobile]
  )

  console.log('limitShow: ', limitShow)
  console.log('currentLimit: ', currentLimit)

  return (
    <Box className={renderCardsClasses} >
      {renderCards.slice(0, currentLimit || renderCards.length).map(offer => (
        <AdCard
          key={offer.id}
          offer={offer}
          isGrid={isGrid}
        />
      ))}
    </Box>
  )
}

export default React.memo(ScrollEnd({
  onlyMobile: true
})(RenderCards))
