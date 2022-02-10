import React from 'react'

import { useMedia } from '../../../../hooks/useMedia'
import FavoritesOffersPlaceHolderMobile from './FavoritesOffersPlaceHolderMobile'
import FavoritesOffersPlaceHolderDesktop from './FavoritesOffersPlaceHolderDesktop'

const FavoritesOffersPlaceHolder = () => {
    const { matchesMobile, matchesDesktop } = useMedia()

    return (
        <>
            {matchesMobile && <FavoritesOffersPlaceHolderMobile />}
            {matchesDesktop && <FavoritesOffersPlaceHolderDesktop />}
        </>
    )
}

export default FavoritesOffersPlaceHolder
