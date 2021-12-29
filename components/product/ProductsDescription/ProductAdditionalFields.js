import React, {useState, useRef, useEffect} from 'react';
// import { json } from 'stream/consumers';
import ProductInformationPlaceHolder
    from "../../placeHolders/ProductInformationPlaceHolder/ProductInformationPlaceHolder";
// import {useMedia} from '../../../hooks/useMedia';

// import InfoItem from './InfoItem'

import { makeStyles } from "@material-ui/core";


const useClass = makeStyles(() => ({
  title: {
    fontSize: '14px',
    color: "rgba(143, 143, 143, 1)",
    marginRight: 4,
  },
  content: {
    fontSize: '14px',
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
}))

const ProductAdditionalFields = ({ category_id, placeOfferJson, allProductInfo}) => {



    const [data, setData] = useState([])
    const prevItem = useRef();
    const classes = useClass()
    // const { matchesMobile, matchesTablet } = useMedia();
    // const mobile = matchesMobile || matchesTablet;



    useEffect(() => {
        if (allProductInfo) {
            const categoryPlaceOffer = placeOfferJson.category;
        const productCategoryArr = category_id.split(',');
    
        console.log(productCategoryArr, categoryPlaceOffer)
    
    
    
        const jsonOne = categoryPlaceOffer.find(item => item.alias == productCategoryArr[0])?.children
        const jsonTwo = jsonOne.find(item => item.alias == productCategoryArr[1])?.additional_fields
        const additionalFieldProduct = allProductInfo?.additional_fields
    
    
        let newArr = []
    
        if (additionalFieldProduct) {
            for (const [key, value] of Object.entries(additionalFieldProduct)) {
    
                if (key == 'id' || key === 'post_id' || key === 'color') {
                    continue
                }
    
    
                const numberOfCheck = parseInt(key.match(/\d+/))
    
    
                if (!numberOfCheck) {
                    newArr.push({
                        title: jsonTwo.find(item => item.alias == key)?.title,
                        value
                    })
                    continue
                }
    
                const aliasName = key.split(numberOfCheck)[0]
                const checkListObj = jsonTwo.find(item => item.alias == aliasName)
    
    
                if (checkListObj.title == prevItem.current) {
                    newArr = newArr.map((item, index) => {
    
                        
                        if (item.title === checkListObj.title && value) {
                            return newArr[index] = {title: checkListObj.title, value: [...newArr[index].value, checkListObj?.check_list_values[numberOfCheck - 1]].filter(item => item)}
                        }
    
                        return item
                    })
                } else {
                    newArr.push({
                        title: checkListObj.title,
                        value: [value ? checkListObj?.check_list_values[numberOfCheck - 1] : null]
                    }) 
                }
    
                prevItem.current = checkListObj.title
                // ?.check_list_values[numberOfCheck]
    
    
                // console.log(aliasName, additionalFieldProduct);
            }
        }
         setData(newArr)
        }
    }, [allProductInfo])


    const addsField = data.filter(item => Array.isArray(item.value) !== true)

    console.log(addsField);
    console.log(data, 'data')
    // console.log(addsField, 'addsField')


    // <ProductInformationPlaceHolder/>

    return (
		// description === undefined ? <ProductInformationPlaceHolder/> :
		<>
			    <div className="productWrap">
                <div className="productDescriptionTitle">Об автомобиле</div>
				<span className='productDescriptionunderLine'></span>
                <div className="productAbout">
                {data.length ? (
                    data.map((item) => (
                    <>
                            
                            {/* <h1 key={i}>{item.title}</h1> */}
                            <div className="productAboutItem" style={ {
                            display: 'flex',
                            justifyContent: 'space-between'
                            // justifyContent: mobile ? 'space-between' : 'normal',
                            // alignItems: name === 'Цвет:'? "center" : "flex-start",
                            // flexDirection: !mobile ? "column" : null,
                            // minWidth: mobile ? '100%' : '40%',
                            // flexBasis: !mobile ? '100%' : '34%',
                            // maxWidth: '50%',
                            // minWidth: '40%',
                            // width: mobile ? '50%' : "100%",
                            // padding: "10px 0",
                            }}>
                                    <div className={classes.title}>{item.title}</div>
                                    <pre className={classes.content}>{item.value}</pre>
                            </div>


                        
                    </>
                    ))
                ) : <ProductInformationPlaceHolder/>}
                </div>
				{/* <pre ref={preRef} className={classSwitcher()}><span ref={textRef}>{description}</span></pre> */}
				{/* {(!isOpenDescription && textRef.current.offsetHeight > 60 ) && <button onClick={showMoreClickHandler} className='productShowMore'>Показать больше</button>} */}
				{/* {isOpenDescription && <button onClick={showMoreClickHandler} className='productHide'>Скрыть</button>} */}
			</div>
		</>
				
	)

};


// const ProductAdditionalFields = ({description, category_id, placeOfferJson, allProductInfo}) => {
// 		const [isOpenDescription, setIsOpenDescription] = useState(false);
//         const textRef = useRef({})
// 		const preRef = useRef({})
//         // const [additionFieldsObject, setAdditionFieldsObject] = useState([])
//         // поле без чеклиста
//         const addsField = []
//         // поле с чек листом
//         const addsFieldWitchCheck = {}

// 		function showMoreClickHandler(event) {
// 			console.log(event)
// 			setIsOpenDescription(!isOpenDescription)
// 		}

// 		function classSwitcher() {
// 			if(isOpenDescription) return 'productDescription productDescriptionActive'
// 			if(!isOpenDescription) return 'productDescription'
// 		}
//         const splitedCategory = category_id.split(',')
//         // console.log(splitedCategory, 'splited cat')
//         // console.log(category_id, 'categoryid')
//         // console.log(placeOfferJson, 'JSON')
//         // console.log(allProductInfo, 'allInfo')
//         const entireObj = allProductInfo.additional_fields ? 
//         Object.entries(allProductInfo.additional_fields)
//         .filter(item => item[1] !== false) : 
//         [];

//         const jsonPath = placeOfferJson.category
//         .find(item=>item.alias === splitedCategory[0])
//         .children.find(item => item.alias === splitedCategory[1])
//         .additional_fields;
    
//         console.log(jsonPath, 'path')
//         console.log(entireObj, 'entire')



//         entireObj.forEach(item => {

//             const x = jsonPath.find(jsonitem=>item[0] === jsonitem.alias)
//             if(x) {
//                 addsField.push( {
//                     title: x.title,
//                     value: item[1]
//                 })
//             }
//             // jsonPath.find(checkItem => 
//             //     console.log(checkItem))
//             // addsFieldWitchCheck.push({
//             //     title:item[0],
//             //     value: item[1]
//             // })

//             if(!x) {
                
                    // const numberOfCheck = parseInt(item[0].match(/\d+/))
//                     const stringNumberOfCheck = numberOfCheck.toString()
//                     const sliceNumber =  -Math.abs(stringNumberOfCheck.length)
//                     const aliasName = item[0].slice(0, sliceNumber)

//                     const newArr = []


//                     const y = jsonPath.find(jsonitem => jsonitem.alias === aliasName)
//                     addsFieldWitchCheck[aliasName] = y?.check_list_values[numberOfCheck]
//                     // console.log(y)
//                     // console.log(y)
//                     // for (let i = 0; i <= stringNumberOfCheck; i++) {
//                         // addsFieldWitchCheck[y?.title] = [].push(y?.check_list_values[numberOfCheck])
//                         // addsFieldWitchCheck[y?.title]: [1, 2]
//                         // addsFieldWitchCheck.push({
//                         //     title: y?.title,
//                         //     value: [y?.check_list_values[i]]
//                         // })
//                     // }
//                     // addsFieldWitchCheck.push({
//                         // title: y?.title,
//                         // value: [y?.check_list_values[numberOfCheck]]
//                         // value: [].push(y.check_list_values[numberOfCheck])
//                     // })
//                     // addsFieldWitchCheck.
//             }


//         })
//         console.log(addsField, 'finalObject')
//         console.log(addsFieldWitchCheck)
//         // console.log(parseInt(testInt.match(/\d+/)))


    

	// return (
	// 	// description === undefined ? <ProductInformationPlaceHolder/> :
	// 	<>
	// 		<div className="productWrap">
	// 			<div className="productDescriptionTitle">Об автомобиле</div>
	// 			<span className='productDescriptionunderLine'></span>
    //             <p>disc</p>
	// 			{/* <pre ref={preRef} className={classSwitcher()}><span ref={textRef}>{description}</span></pre> */}
	// 			{/* {(!isOpenDescription && textRef.current.offsetHeight > 60 ) && <button onClick={showMoreClickHandler} className='productShowMore'>Показать больше</button>} */}
	// 			{/* {isOpenDescription && <button onClick={showMoreClickHandler} className='productHide'>Скрыть</button>} */}
	// 		</div>
	// 	</>
				
	// )
// }


export default ProductAdditionalFields;
