import React from 'react';

import { useMedia } from '../../../../hooks/useMedia'
import OfferActivePlaceHolderDesktop from './OfferActivePlaceHolderDesktop'
import OfferPlaceHolderMobile from '../OfferPlaceHolderMobile'

const OfferActivePlaceHolder = () => {
    const { matchesMobile, matchesDesktop } = useMedia()

    return (
        <>
            {matchesMobile && <OfferPlaceHolderMobile />}
            {matchesDesktop && <OfferActivePlaceHolderDesktop />}
        </>
    )
};

export default OfferActivePlaceHolder;
