import React from 'react'

export const useAdCardClass = (commercial, isGrid, screenIsMobile) => {

  const isCommercial = commercial === 1 || commercial === 2

  const isCommercialCardWrapp = isCommercial ? true : false // 'card__wrapper-yellow'
  const isCardGridMobileWrapp = !isGrid && screenIsMobile ? true : false // 'card__wrapperV2'
  const isCommercialGridCardWrapp = !isGrid && isCommercial && screenIsMobile  ? true : false // 'card__wrapper-yellow card__wrapperV2'

  const isCommercialCard = commercial === 2 ? 'card card__lg' : 'card'

  const clasNameObject = {
    isCommercialCard: isCommercialCard,
    isCommercialCardWrapp: isCommercialCardWrapp,
    isCardGridMobileWrapp: isCardGridMobileWrapp,
    isCommercialGridCardWrapp: isCommercialGridCardWrapp,

  }


  return clasNameObject
}
