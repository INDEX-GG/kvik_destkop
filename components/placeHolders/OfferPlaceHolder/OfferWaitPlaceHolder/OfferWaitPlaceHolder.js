import React from 'react';

import { useMedia } from '../../../../hooks/useMedia'
import OfferWaitPlaceHolderDesktop from './OfferWaitPlaceHolderDesktop'
import OfferPlaceHolderMobile from '../OfferPlaceHolderMobile'

const OfferWaitPlaceHolder = () => {
    const { matchesMobile, matchesDesktop } = useMedia()

    return (
        <>
            {matchesMobile && <OfferPlaceHolderMobile />}
            {matchesDesktop && <OfferWaitPlaceHolderDesktop />}
        </>
    )
};

export default OfferWaitPlaceHolder;
