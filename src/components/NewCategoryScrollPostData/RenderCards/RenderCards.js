import React, {useMemo} from 'react'
import {Box} from "@material-ui/core";

import ScrollEnd from '../../ScrollEnd/ScrollEnd'
import AdCard from '../../AdCard/AdCard'

import {checkActiveClass} from '../../../services/services'

import {useRenderCardsStyle} from './style'

/**
 * * Отрисовывает карточки объявлений
 * @param {renderCards} Array
 * @param {isGrid} Boolean
 * @param {isMobile} Boolean
 * @param {limitShow} Number
 * ! NOTICE Пропсы ниже используются в HOC ScrollEnd, здесь не используются
 * @param {setLimitShow} setState
 * @param {maxCountShow} Number
 * @returns
 */
const RenderCards = ({renderCards, isGrid, isMobile, limitShow}) => {

  const classes = useRenderCardsStyle()

  const renderCardsClasses = useMemo(
    () => checkActiveClass(
      !isGrid && isMobile,
      classes.gridView,
      [classes.gridView, classes.defaultViewMobile]
    ),
    [isGrid, isMobile]
  )

  return (
    <Box className={renderCardsClasses} >
      {renderCards.slice(0, limitShow).map(offer => (
        <AdCard
          offer={offer}
          key={offer.id}
          isGrid={isGrid}
        />
      ))}
    </Box>
  )
}

export default React.memo(ScrollEnd(RenderCards))
