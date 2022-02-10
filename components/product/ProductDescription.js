import React, {useState, useRef, useEffect} from 'react';
import ProductInformationPlaceHolder from "../placeHolders/ProductInformationPlaceHolder/ProductInformationPlaceHolder";
import {useMedia} from "#hooks/useMedia";
import {makeStyles} from "@material-ui/core";

const useClass = makeStyles(() => ({
    descriptionWrap: {
        // display: 'flex',
        // padding: '10px 16px'
        display: 'grid',
        // gridTemplateColumns: '.4fr 1fr',
        // gridColumnGap: '40px'
    },
    descriptionContainer: {
        gridColumn: '1/3',
        minWidth: '100%',
        padding: '10px 12px'
    },
    productDescriptionUnderLine: {
        display: 'block',
        // margin: '0 -16px',
        marginBottom: '10px',
        borderBottom: '1px solid rgb(233, 233, 233)',
        marginLeft: '-16px',
        marginRight: '-16px'
      },
    descriptionTitle: {
        color: 'rgba(143, 143, 143, 1)',
        width: '40%',
        fontSize: '14px'
    },

    ['@media screen and (max-width: 959px)']: {
        descriptionContainer: {
            padding: '10px 12px'
        },
        descriptionWrap: {
            display: 'block',
        },

        descriptionTitle: {
            fontSize: '22px',
            fontWeight: '500',
            color: 'black',
        },

    }

}))



const ProductDescription = ({description}) => {

    const [isOpenDescription, setIsOpenDescription] = useState(false)
    const textRef = useRef({})
    const preRef = useRef({})
    const classes = useClass()
    const {matchesMobile, matchesTablet} = useMedia();

    const mobile = matchesMobile || matchesTablet;
    // const checkTextHieght = textRef.current.offsetHeight > mobile ? 50 : 60

    useEffect(() => {
        setIsOpenDescription(false)
    }, [description])


    function showMoreClickHandler() {
        setIsOpenDescription(!isOpenDescription)
    }

    function classSwitcher() {
        if (isOpenDescription) return 'productDescription productDescriptionActive'
        if (!isOpenDescription) return 'productDescription'
    }

    return (
        description === undefined ? <ProductInformationPlaceHolder/> :
            <div className={classes.descriptionContainer}>
                {!mobile && <span className={classes.productDescriptionUnderLine}></span>}
                <div className={classes.descriptionWrap}>

                    {/* <div className={classes.descriptionTitle}>Описание:</div> */}
                    {mobile && <span className={classes.productDescriptionUnderLine}></span>}
                    <pre ref={preRef} className={mobile ? classSwitcher() : 'productDescriptionActive'}>
                        <span ref={textRef}>{description}</span>
                    </pre>
                    {/* <pre ref={preRef} className={classSwitcher()}><span ref={textRef}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span></pre> */}
                    {/* {(mobile && !isOpenDescription && textRef.current.offsetHeight > 60) && <button onClick={showMoreClickHandler} className='productShowMore'>Показать больше</button>} */}
                    {/* {mobile ? (
                        (!isOpenDescription) ?
                        <button onClick={showMoreClickHandler} className='productShowMore'>Показать больше</button> : null
                    ) : null} */}
                    {/* {mobile ? (
                        isOpenDescription && (<button onClick={showMoreClickHandler} className='productHide'>Скрыть</button>)
                    ) : null} */}
                </div>
                {(mobile && !isOpenDescription && textRef.current.offsetHeight > 60) && <button onClick={showMoreClickHandler} className='productShowMore'>Показать больше</button>}
                {mobile ? (
                        isOpenDescription && (<button onClick={showMoreClickHandler} className='productHide'>Скрыть</button>)
                    ) : null}
            </div>

    )
}


export default ProductDescription;
