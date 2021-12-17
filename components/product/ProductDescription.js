import React, {useState} from 'react';
import ProductInformationPlaceHolder from "../placeHolders/ProductInformationPlaceHolder/ProductInformationPlaceHolder";


// const ProductDescription = ({description, mobile, style}) => {
	const ProductDescription = ({description}) => {
		const [isOpenDescription, setIsOpenDescription] = useState(false)

		function showMoreClickHandler(event) {
			console.log(event)
			setIsOpenDescription(!isOpenDescription)
		}

		function classSwitcher() {
			if(isOpenDescription) return 'productDescription productDescriptionActive'
			if(!isOpenDescription) return 'productDescription'
		}

	return (
		description === undefined ? <ProductInformationPlaceHolder/> :
		<>
			<div className="productWrap">
				{/* {mobile && <div className="productLocality" style={{padding: "14px 0"}}>Описание</div>} */}
				<div className="productDescriptionTitle">Описание</div>
				<span className='productDescriptionunderLine'></span>
				<pre className={classSwitcher()}>{description}</pre>
				{!isOpenDescription && <button onClick={showMoreClickHandler} className='productShowMore'>Показать больше</button>}
				{isOpenDescription && <button onClick={showMoreClickHandler} className='productHide'>Скрыть</button>}
			</div>
		</>
				
	)
}


export default ProductDescription;
