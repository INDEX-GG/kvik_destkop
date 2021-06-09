import React from 'react';

import UpPanel from '../../components/uppanel';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Verify from './Verify';

function PlaceOffer() {
    return (
        <div id="placeAA" class="placeaa">
            <UpPanel/>
            <Header />
                <div class="placeaa__wrapper">
                    <div className="placeaa__verify">
                        <Verify Verify={3}/>
                    </div>
                    <form className="placeaa__form">
                        <div className="placeaa__form__title title">Новое объявление</div>
                    </form>
                </div>
            <Footer />
        </div>
    )
}

export default PlaceOffer;
