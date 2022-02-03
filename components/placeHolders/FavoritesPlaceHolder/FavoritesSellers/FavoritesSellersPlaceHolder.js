import React from 'react';

import {useMedia} from '../../../../hooks/useMedia'
import FavoritesSellersPlaceHolderDesktop from './FavoritesSellersPlaceHolderDesktop'
import FavoritesSellersPlaceHolderMobile from './FavoritesSellersPlaceHolderMobile'

const FavoritesSellersPlaceHolder = () => {
    const {matchesMobile, matchesDesktop} = useMedia();

    return (
        <>
            {matchesMobile && <FavoritesSellersPlaceHolderMobile />}
            {matchesDesktop && <FavoritesSellersPlaceHolderDesktop />}
        </>

    );
};

export default FavoritesSellersPlaceHolder;
