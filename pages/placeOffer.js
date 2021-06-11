import React from 'react';



import Footer from '../components/Footer';
import Header from '../components/Header';
import Verify from '../components/placeOffer/Verify';

function PlaceOffer() {
    return (
        <div id="placeAA" className="placeaa">
            <Header />
            <div className="placeaa__wrapper">
                <div className="placeaa__verify">
                    <Verify Verify={3} />
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
