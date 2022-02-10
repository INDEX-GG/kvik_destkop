import React from 'react';

import {useMedia} from "../../../../hooks/useMedia";
import SettingsPlaceHolderMobile from './SettingsPlaceHolderMobile';

const SettingsPlaceHolder = () => {
    const {matchesMobile} = useMedia();

    return (
        <>
            {matchesMobile && <SettingsPlaceHolderMobile />}
        </>
    );
};

export default SettingsPlaceHolder;
