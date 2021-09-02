import React from 'react';
import { Dialog, makeStyles } from '@material-ui/core';
import { useMedia } from '../hooks/useMedia';


const useStyles = makeStyles(() => {
	
})


const BuyDeliveryMap = ({dialog, setDialog}) => {

	const classes = useStyles();
	const {matchesMobile} = useMedia();
	

	/* function paragraphBox(map = false, xs = false, buttonName = matchesMobile ? "Перейти к оплате" : "Выбрать этот пункт") {
        return (
            <div className={`${classes.paragraphBox} ${matchesMobile ? classes.paragraphContainer : ""}`}>
                <div className={classes.paragraphList}>
                    <div className={classes.paragraphItem}>
                        <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                        <div className={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                        <div className={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                        {xs ? <Button className={classes.buyPaymentButton} type="submit">{buttonName}</Button> : null}
                    </div>
                    <div className={classes.paragraphItem}>
                        <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                        <div className={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                        <div className={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                    </div>
                    <div className={classes.paragraphItem}>
                        <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                        <div className={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                        <div className={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                    </div>
                    <div className={classes.paragraphItem}>
                        <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                        <div className={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                        <div className={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                    </div>
                    <div className={classes.paragraphItem}>
                        <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                        <div className={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                        <div className={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                    </div>
                    <div className={classes.paragraphItem}>
                        <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                        <div className={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                        <div className={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                    </div>
                    <div className={classes.paragraphItem}>
                        <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                        <div className={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                        <div className={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                    </div>
                </div>
                {map ?
                    <div className={classes.containerMap}>
                        <div className={classes.paragraphMap}></div>
                    </div> : null}
            </div>
        )
    } */

    // function paragraphMap() {
    //     return (
    //             <div className={classes.paragraphContainer}>
    //                 <div className={classes.paragraphMap}></div>
    //             </div>
    //             {paragraphBox(false, true, "Выбрать этот пункт")}
    //         </>
    //     )
    // }


	return (
		<Dialog open={dialog || false} fullScreen={matchesMobile ? true : false} onClose={() => setDialog(!dialog)}>
        <div className={matchesMobile ? "modal__block__top accountTop" : classes.paragraphContainer} >
            {matchesMobile ?
                <>
                    <div className="accountArrowLeft"></div>
                    <div className={classes.dialogTitle}>
                        <h6 className="modal__block__top_title">Выбор пункта самовызова товара</h6>
                    </div>
                </> : <div className={classes.paragraphTitle}>Выбор пункта самовызова товара</div>}
            {matchesMobile ? <div className={classes.paragraphMenu}>
                {/* <div
                    className={`${classes.paragraphMenuItem} ${paragraphContent ? classes.paragraphMenuItemActive : null}`} onClick={() => setParagraphContent(!paragraphContent)}>Список</div>
                <div
                    className={`${classes.paragraphMenuItem} ${paragraphContent ? null : classes.paragraphMenuItemActive}`}
                    onClick={() => {
                        setParagraphContent(!paragraphContent)
                    }}>Карта</div> */}
            </div> : null}
            {/* {matchesMobile ? paragraphContent ? paragraphBox(false, true) : paragraphMap() : paragraphBox(true)} */}
        </div>
    </Dialog>
	)
}

export default BuyDeliveryMap;