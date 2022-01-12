import React, {useRef, useState, useEffect} from 'react';
// import { json } from 'stream/consumers';
import ProductInformationPlaceHolder
    from "../../placeHolders/ProductInformationPlaceHolder/ProductInformationPlaceHolder";
import ProductDescription from '../../product/./ProductDescription';
import {useMedia} from '../../../hooks/useMedia';

// import InfoItem from './InfoItem'

import {makeStyles} from "@material-ui/core";


const useClass = makeStyles(() => ({
    title: {
        // maxWidth: '50%',
        fontSize: '14px',
        color: "rgba(143, 143, 143, 1)",
        marginRight: 4,
        
    },
    content: {
        fontSize: '14px',
        fontWeight: '400',
        color: "rgba(21, 21, 21, 1)",
    },
    autoPlaceholder: {
        // display: "flex",
        flexDirection: 'column',
        flexWrap: 'wrap',
        // maxHeight: 420,
        maxHeight: '170px',
        fontSize: 14,
        padding: "10px 16px",
        overflow: 'hidden',
    },
    autoPlaceHolderActive: {
        display: "flex",
        flexDirection: 'column',
        flexWrap: 'wrap',
        maxHeight: '100%',
        fontSize: 14,
        padding: "10px 16px",
        overflow: 'hidden'
    },
// title: {
//     color: "#8F8F8F",
//     marginRight: 4,
// },
// content: {
//     color: "#2C2C2C"
// },
    productWrap: {
        padding: '0 12px'
    },
    additionalFieldsWrap:{
        padding: '0 12px',
        overflow: 'hidden'
    },
    additionalFieldsWrapIsOpen:{
        padding: '0 12px',
        overflow: 'hidden'
    },
    additionalFieldsContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridColumnGap: '10px',
    },

    additionalFieldsTitle: {
        color: 'black',
        fontSize: '22px',
        fontWeight: '500'
    },
    descriptionPlaseholder: {
        // display: 'flex',
        // flexDirection: "column",
        // flexWrap: "wrap",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        // maxHeight: 250,
        // width: "100%"
    },
    descriptionItem: {
        padding: "18px 0",
    },
    productAbout: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    // productAboutClosed: {
    //     maxHeight: '140px',
    //     overflow: 'hidden'
    // },
    productCheckList: {
        width: '100%'
    },
    checkListTitle: {
        fontSize: '14px',
        color: "rgba(143, 143, 143, 1)",
        // width: '40%'
        // marginRight: 4,
    },
    checkListUl: {
        // width: '100%'
        // width: '60%',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
    aboutUnderline: {
        display: 'block',
        // margin: '0 -16px',
        marginBottom: '10px',
        borderBottom: '1px solid #e9e9e9'
    },
    checkListItem: {
        // display: 'flex',
        display: 'grid',
        gridTemplateColumns: '.4fr 1fr',
        gridColumnGap: '40px',
        marginBottom: '10px',
    },
    checkListContent: {
        wordBreak: 'break-word',
        fontSize: '14px',
        color: "rgba(21, 21, 21, 1)",
        fontWeight: '400',
        // margin: '5px',
        marginBottom: '10px',
        // textAlign: 'right'
        ['&:nth-child(2n)']: {
            paddingLeft: '10px'
        }
    },
    checkListUnderLine: {
        display: 'block',
        margin: '0 -16px',
        width: '200%',
        marginBottom: '10px',
        borderBottom: '1px solid #e9e9e9'
    },


    ['@media screen and (max-width: 959px)']:{
        aboutUnderline: {
            margin: '0 -16px',
        },
        additionalFieldsContainer: {
            display: 'block'
        },
        checkListUl: {
            // gridTemplateColumns: 'repeat(1, 1fr)',
            gridTemplateColumns: '1fr 1fr',
            gridColumnGap: '10px'
        },
        checkListContent: {
            ['&:nth-child(2n)']: {
                paddingLeft: '0'
            }
        },
        checkListItem: {
            display: 'grid',
            // gridTemplateColumns: 'repeat(2, 1fr)'
            gridTemplateColumns: '.7fr 1fr'
        },

        additionalFieldsWrap:{
            maxHeight: '150px',
        },

        productWrap: {
            padding: '0 12px',
            maxHeight: '145px',
            overflow: 'hidden'
        },

        productWrapIsOpen: {
            padding: '0 12px',
            overflow: 'hidden'
        }

        // productAboutClosed: {
        //     maxHeight: '140px',
        //     overflow: 'hidden'
        // },
    },



    ['@media screen and (max-width: 649px)']: {
        checkListUl: {
            gridTemplateColumns: 'repeat(1, 1fr)',
            gridColumnGap: '10px'
        },

        checkListItem: {
            display: 'grid',
            // gridTemplateColumns: 'repeat(2, 1fr)'
            gridTemplateColumns: '1fr 1fr'
        },
    },



}))
function generateArrays(category_id, allProductInfo, placeOfferJson, finalArr=[], finalArrCheck=[]) {
    try {
        
    
        // console.log(finalArr, 'final Arr')
        // console.log(finalArrCheck, 'final arrCheck')
        const splitedCategory_id = category_id?.split(',');
        const backJs = allProductInfo?.additional_fields ? 
        Object.entries(allProductInfo?.additional_fields).filter(item => item[1] !== false) : 
        [];
        // console.log(splitedCategory_id, 'splited id')
        // console.log(backJs, 'back js')
        // console.log(placeOfferJson, 'frontjs')
        // const frontJs = placeOfferJson.category.find(item => item.alias === splitedCategory_id[0])
        //   .children.find(item => item.alias === splitedCategory_id[1])
        //   .additional_fields;

    
    const frontJs = splitedCategory_id.reduce((acc, item, index) => {
        if(splitedCategory_id?.length - 1 === index) {
            return acc?.children.find(child=> child?.alias === item)
        }

        if(acc) {
            return acc?.children.find(child => child?.alias === item)
        }
         return placeOfferJson?.category.find(category => category?.alias === item)
         
    }, undefined)?.additional_fields
        backJs.forEach((item) => {
            // поля с айдишниками нам не интересны
            // Гбо и цвет времено исключены
            if (item[0] === 'id' || item[0] === 'post_id' || item[0] === 'color' || item[0] === 'hbo') {
                return 
            }

            // Находим образец объекта на фронте и пушим новый объект в финальный массив, если удалось найтия 
            
            const commonObj = frontJs.find(it => it?.alias === item[0])

        if (commonObj !== undefined) {
            finalArr.push({
            title: commonObj?.title,
            value: item[1]
            })
            return 
        }
        // Логика для (type: check_list) - если по алиасу найти не смогли (например пришел item[0] === airbag3).
        // Ниже получаем числа из алиасов, затем узнаем длину символов и слайсим строку для получения алиаса.
        const numberOfCheck = parseInt(item[0]?.match(/\d+/))
        const sliceNumber = -Math?.abs(numberOfCheck.toString()?.length)
        const aliasName = item[0]?.slice(0, sliceNumber)
    
        // Находим образец с чеклистами на фронте, по полученому выше алиасу.
        const checkObj = frontJs?.find(it => it?.alias === aliasName)
    
        // проверяем был ли подобный объект запушен в финальный массив, если да то делаем спред, если нет то создаем новый объект.
        const findedCheckObj = finalArrCheck?.find(it => it?.title === checkObj?.title)
        if (findedCheckObj) {
            findedCheckObj.value = [...findedCheckObj?.value, checkObj?.check_list_values[numberOfCheck - 1]]
            return
        }
        // тут создается новый объект, если условие выше не выполнилось
        finalArrCheck.push({
            title: checkObj?.title,
            value: [checkObj?.check_list_values[numberOfCheck - 1]],
        })
        return 
        })
    } catch (error) {
            console.log(error)
        }
}


const ProductAdditionalFields = ({category_id, placeOfferJson, allProductInfo, description}) => {
    const classes = useClass()
    const [showMore, setShowMore] = useState(false)
    const [showMoreCheckList, SetShowMoreCheckList] = useState(false)
    const { matchesMobile, matchesTablet } = useMedia();
    const additional_fieldsRef = useRef()
    const checkListWrapper = useRef()
    
    const wrapHeight = additional_fieldsRef?.current?.offsetHeight;
    const checkWrapHeight = checkListWrapper?.current?.offsetHeight;
    const mobile = matchesMobile || matchesTablet;
    // массив для обычных полей
    let finalArr = []
    // массив для чеклистов
    let finalArrCheck = []
    // буль для рендера плейсхолдера
    const additionalFieldsIsPending = allProductInfo.additional_fields === undefined
    generateArrays(category_id, allProductInfo, placeOfferJson, finalArr, finalArrCheck)

    
    useEffect(()=> {
        // закрывашка свойсв при отрисовке новой страницы
        setShowMore(false)
        SetShowMoreCheckList(false)
    }, [allProductInfo])

    

    function clickHandler() {
        setShowMore(!showMore)
    }
    
    function checkListClickHandler() {
        SetShowMoreCheckList(!showMoreCheckList)
    }

    function classSwitcher() {
        if(showMore){
            return classes.additionalFieldsWrapIsOpen
        }
        return `${classes.additionalFieldsWrap}`
    }

    function checkListClassSwitcher() {
        if(showMoreCheckList){
            return classes.productWrapIsOpen
        }
        return `${classes.productWrap}`
    }
  

    
    
    return (

        <div>
            {mobile && <ProductDescription description={description}/>}
            {finalArr.length >= 1 && 
                // <div className="productWrap descriptionIsClosed">
                <div className={classSwitcher()}>
                    {mobile && <p className={classes.additionalFieldsTitle}>О товаре</p>}
                    <span className={classes.aboutUnderline}></span>
                    <div ref={additional_fieldsRef} className={classes.additionalFieldsContainer}>
                        {finalArr.map((item, index) => (
                            <div key={index} className="productAboutItem">
                                <span className={classes.title}>{item?.title}:</span>
                                <pre className={classes.content}>{item?.value}</pre>
                            </div>
                        ))}

                    {/* {!mobile && <ProductDescription description={description}/>} */}


                    </div>
                </div>
            }
            {(mobile && !showMore) && (wrapHeight > 150) &&
                <button onClick={clickHandler} 
                    className='productShowMore'>
                        Показать больше
                </button>
            }

            {(mobile && showMore) && 
                <button 
                    onClick={clickHandler} 
                    className='productShowMore'>
                        Скрыть
                </button>
            }

            {!mobile && <ProductDescription description={description}/>}

            {finalArrCheck.length >= 1 && 
                <div className={checkListClassSwitcher()}>
                    {mobile && <p className={classes.additionalFieldsTitle}>Дополнительно</p>}
                    <span className={classes.checkListUnderLine}></span>
                    <div ref={checkListWrapper} className={classes.productCheckList}>
                        {finalArrCheck.map((item, index) => (
                            <div key={index} className={classes.checkListItem}>
                                <span className={classes.checkListTitle}>{item?.title}:</span>
                                <ul className={classes.checkListUl}>
                                    {item?.value.map((value, index) => <li className={classes.checkListContent} key={index}>{value}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            }

            {(mobile && !showMoreCheckList) && (checkWrapHeight > 145) &&
                <button onClick={checkListClickHandler} 
                className='productShowMore'>
                    Показать больше
                </button>
            }

            {(mobile && showMoreCheckList) && 
                <button 
                onClick={checkListClickHandler} 
                className='productShowMore'>
                    Скрыть
                </button>
            }



            

            {/* {finalArrCheck.length >= 1 && 
                <div className="productWrap">
                    {!mobile && <span className={classes.checkListUnderLine}></span>}
                    <div className={classes.productCheckList}>
                        {finalArrCheck.map((item, index) => (
                            <div key={index} className={classes.checkListItem}>
                                <div className={classes.checkListTitle}>{item.title}:</div>
                                <ul className={classes.checkListUl}>
                                    {item.value.map((value, index) => <li className={classes.checkListContent} key={index}>{value}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            } */}


            {additionalFieldsIsPending && <ProductInformationPlaceHolder/>}
        </div>
        

        // data === undefined ? (
        //     <ProductInformationPlaceHolder/>
        // ) : (
        //     <>
        //         {data.length ? (
        //             <>
        //                 <div className="productWrap">
        //                     <span className='productDescriptionunderLine'></span>
        //                     <div className="productAbout">
        //                         {data.map((item) => (
        //                             <>

        //                                 {/* <h1 key={i}>{item.title}</h1> */}
        //                                 <div className="productAboutItem" style={{
        //                                     display: 'flex',
        //                                     justifyContent: 'space-between'
        //                                     // justifyContent: mobile ? 'space-between' : 'normal',
        //                                     // alignItems: name === 'Цвет:'? "center" : "flex-start",
        //                                     // flexDirection: !mobile ? "column" : null,
        //                                     // minWidth: mobile ? '100%' : '40%',
        //                                     // flexBasis: !mobile ? '100%' : '34%',
        //                                     // maxWidth: '50%',
        //                                     // minWidth: '40%',
        //                                     // width: mobile ? '50%' : "100%",
        //                                     // padding: "10px 0",
        //                                 }}>
        //                                     <div className={classes.title}>{item.title}</div>
        //                                     <pre className={classes.content}>{item.value}</pre>
        //                                 </div>


        //                             </>
        //                         ))}
        //                     </div>
        //                 </div>
        //             </>
        //         ) : null}
        //     </>
        // )

    )

};



export default ProductAdditionalFields;

// Рабочий вариант на случай поломок

// const prevItem = useRef();
// const [data, setData] = useState(undefined)

    // const generateJson = (category, json) => {
    //     console.log(json);

    //     if (Array.isArray(json)) {
    //         let currentObj = json.find(item => item.alias === category[0])?.children

    //         for (let i = 1; i < category.length; i++) {
    //             if (i === category.length - 1) {
    //                 currentObj = currentObj.find(item => item.alias === category[i])
    //             } else {
    //                 currentObj = currentObj.find(item => item.alias === category[i])?.children
    //             }
    //         }

    //         return currentObj?.additional_fields
    //     }
    // }


    // useEffect(() => {
    //     if (allProductInfo) {
    //         const categoryPlaceOffer = placeOfferJson.category;
    //         const productCategoryArr = category_id.split(',');



    //         const additionalFieldJson = generateJson(productCategoryArr, categoryPlaceOffer)
    //         const additionalFieldProduct = allProductInfo?.additional_fields


    //         console.log(additionalFieldJson);

    //         let newArr = []

    //         if (additionalFieldProduct) {
    //             for (const [key, value] of Object.entries(additionalFieldProduct)) {

    //                 if (key == 'id' || key === 'post_id' || key === 'color') {
    //                     continue
    //                 }


    //                 const numberOfCheck = parseInt(key.match(/\d+/))


    //                 if (!numberOfCheck) {
    //                     newArr.push({
    //                         title: additionalFieldJson.find(item => item.alias == key)?.title,
    //                         value
    //                     })
    //                     continue
    //                 }

    //                 const aliasName = key.split(numberOfCheck)[0]
    //                 const checkListObj = additionalFieldJson.find(item => item.alias == aliasName)


    //                 if (checkListObj) {
    //                     if (checkListObj.title == prevItem.current) {
    //                         newArr = newArr.map((item, index) => {


    //                             if (item.title === checkListObj.title && value) {
    //                                 return newArr[index] = {
    //                                     title: checkListObj.title,
    //                                     value: [...newArr[index].value, checkListObj?.check_list_values[numberOfCheck - 1]].filter(item => item)
    //                                 }
    //                             }

    //                             return item
    //                         })
    //                     } else {
    //                         newArr.push({
    //                             title: checkListObj.title,
    //                             value: [value ? checkListObj?.check_list_values[numberOfCheck - 1] : null]
    //                         })
    //                     }

    //                     prevItem.current = checkListObj.title
    //                 }

    //             }
    //         }
    //         setData(newArr)
    //     }
    // }, [allProductInfo])