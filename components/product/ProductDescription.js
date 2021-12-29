import React, {useState, useRef} from 'react';
import ProductInformationPlaceHolder from "../placeHolders/ProductInformationPlaceHolder/ProductInformationPlaceHolder";
import {useMedia} from "#hooks/useMedia";




const ProductDescription = ({description}) => {

    const [isOpenDescription, setIsOpenDescription] = useState(false)
    const textRef = useRef({})
    const preRef = useRef({})

    const {matchesMobile, matchesTablet} = useMedia();

    const mobile = matchesMobile || matchesTablet;
    const checkTextHieght = textRef.current.offsetHeight > mobile ? 50 : 60


    function showMoreClickHandler(event) {
        console.log(event)
        setIsOpenDescription(!isOpenDescription)
    }

    function classSwitcher() {
        if (isOpenDescription) return 'productDescription productDescriptionActive'
        if (!isOpenDescription) return 'productDescription'
    }


    console.log((!isOpenDescription && textRef.current.offsetHeight > mobile ? 50 : 60));

    return (
        description === undefined ? <ProductInformationPlaceHolder/> :
            <>
                <div className="productWrap">
                    {/* {mobile && <div className="productLocality" style={{padding: "14px 0"}}>Описание</div>} */}
                    <div className="productDescriptionTitle">Описание</div>
                    <span className='productDescriptionunderLine'></span>
                    <pre ref={preRef} className={mobile ? classSwitcher() : 'productDescriptionActive'}><span ref={textRef}>{description}</span></pre>
                    {/* <pre ref={preRef} className={classSwitcher()}><span ref={textRef}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span></pre> */}
                    {mobile ? (
                        (checkTextHieght && !isOpenDescription) ?
                        <button onClick={showMoreClickHandler} className='productShowMore'>Показать больше</button> : null
                    ) : null}
                    {mobile ? (
                        isOpenDescription && (<button onClick={showMoreClickHandler} className='productHide'>Скрыть</button>)
                    ) : null}
                </div>
            </>

    )
}


export default ProductDescription;
