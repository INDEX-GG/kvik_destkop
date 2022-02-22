import React from 'react'

export const useAdCardClass = ({highlighting, archived, selection_size, isGrid, reviewed, screenIsMobile}) => {

  const isHighlight = highlighting
  const isSelectionSize = selection_size

  const isCommercialCardWrapp = highlighting ? true : false // 'card__wrapper-yellow'
  const isCardGridMobileWrapp = !isGrid && screenIsMobile ? true : false // 'card__wrapperV2'
  const isCommercialGridCardWrapp = !isGrid && highlighting && screenIsMobile  ? true : false // 'card__wrapper-yellow card__wrapperV2'


  const isArchivedCard = archived
  const isReviewedCard = reviewed < 0

  const clasNameObject = {
    isHighlightCard: isHighlight,
    isSelectionSizeCard: isSelectionSize,
    isCardGridMobileWrapp: isCardGridMobileWrapp,
    isCommercialGridCardWrapp: isCommercialGridCardWrapp,
    isArchivedCard: isArchivedCard,
    isReviewedCard: isReviewedCard,

  }


  return clasNameObject
}
