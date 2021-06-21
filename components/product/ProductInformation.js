import React, { useState } from 'react';
import { useMedia } from '../../hooks/useMedia';

export default function ProductInformation(objP) {

    const [collMap, setCollMap] = useState(true);
    const handleCollMap = e => {
        e.preventDefault();
        if (collMap) {
            setCollMap(false);
        } else {
            setCollMap(true);
        }
    }

    const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();

    return (
        <>
            <div className="productPageCharacterMapBlock" style={collMap ? { paddingBottom: 0 } : { paddingBottom: '18px' }} >
                <div className="productPageCharacterLocality">
                    {!matchesMobile && !matchesTablet && <div>Местоположение</div>}
                    <div>{objP.locality}</div>
                    <a className={`productPageCharacterMapSwitch highlight underline ${collMap ? ('') : ('collMapSw')}`} onClick={e => handleCollMap(e)}>На карте</a>
                </div>
                <div className="productPageCharacterMap" style={collMap ? { height: 0 } : { height: '400px' }}>
                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ade278bb067489a15a031480c20e3318914d391acd3e1995348d759fa5baa2167&amp;source=constructor" width="618" height="400" frameBorder="0"></iframe>
                </div>
            </div>
            <div className="productPageCharacter thin">
                <div>
                    <div>Свойство</div>
                    <div>Значение</div>
                </div>
                <div>
                    <div>Свойство</div>
                    <div>Значение</div>
                </div>
                <div>
                    <div>Свойство</div>
                    <div>Значение</div>
                </div>
                <div>
                    <div>Поделиться</div>
                    <div>
                        <a className="productPageCharacterVK"></a>
                        <a className="productPageCharacterFB"></a>
                        <a className="productPageCharacterOK"></a>
                    </div>
                </div>
            </div>
        </>
    )
}
