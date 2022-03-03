import React, {useMemo} from 'react'
import {Box} from "@material-ui/core";

import RenderCards from './RenderCards/RenderCards'
import ScrollPostDataHeader from './ScrollPostDataHeader/ScrollPostDataHeader'
import CustomButtonUI from 'src/UI/UIcomponent/CustomButtonUI/CustomButtonUI'

import {useCategoryScrollPostData} from './useCategoryScrollPostData'

import {checkActiveClass} from '../../services/services'
import { checkValidArray } from 'src/services/services';

import {useCategoryScrollPostDataStyle} from './style'

/**
 *
 * @param {url} String
 * @param {product} Object
 * @returns
 */
const CategoryScrollPostData = ({url, product}) => {

  const classes = useCategoryScrollPostDataStyle()
  const scrollPostData = useCategoryScrollPostData(url, product)

  const {
    postData: {
      isGrid,
      setGridView,
      isMobile,
    },
    renderCards,
    maxCountShow,
    limitShow,
    setLimitShow
  } = scrollPostData;

  const similarLoadPostClass = useMemo(
    () => checkActiveClass(
      false,
      classes.locationMapArrow,
      [classes.locationMapArrowActive]
    ),
    []
  )

  const handlerClickShowMore = () => {
    console.log('хотим посмотреть еще')
    setLimitShow(prevState => prevState + maxCountShow)
  }

  return (
    <>
      <Box>
        <ScrollPostDataHeader
          isGrid={isGrid}
          isMobile={isMobile}
          setGridView={setGridView}
        />
      </Box>

      {checkValidArray(renderCards) && (
        <RenderCards
          isGrid={isGrid}
          isMobile={isMobile}
          renderCards={renderCards}
          limitShow={limitShow}
          setLimitShow={setLimitShow}
        />
      )}

      <Box
        className={classes.showMore}
      >
        <CustomButtonUI
          onClick={handlerClickShowMore}
        >
          Показать еще
          <Box component='span' className={similarLoadPostClass}/>
        </CustomButtonUI>
      </Box>
    </>
  )
}

export default React.memo(CategoryScrollPostData)
