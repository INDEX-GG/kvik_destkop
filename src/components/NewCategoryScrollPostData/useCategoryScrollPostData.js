import { useMemo, useState } from 'react'

import { useMedia } from '#hooks/useMedia';
import {useFetchSimilarPosts} from './useFetchSimilarPosts'

export const useCategoryScrollPostData = (url, product) => {

  const maxCountShow = 8

  const {matchesMobile, matchesTablet} = useMedia()
  const {renderCards} = useFetchSimilarPosts(url, product.id)

  const [gridView, setGridView] = useState(true)
  const [limitShow, setLimitShow] = useState(maxCountShow)

  const isMobile = useMemo(() => (
    !!(matchesMobile || matchesTablet)
  ), [matchesMobile, matchesTablet])

  const isGrid = useMemo(() => (
    gridView
  ), [gridView])

  return {
    postData: {
      isGrid,
      setGridView,
      isMobile,
    },
    renderCards,
    maxCountShow,
    limitShow,
    setLimitShow
  }

}
