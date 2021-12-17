import React, { useState } from 'react';
import ProductYMAP from './ProductYMAP';


const ProductMap = ({address, coordinates}) => {

	const [collMap, setCollMap] = useState(true);
	const formatingAddress = address.split(',').map((element, index) => {
		if(index!==0){
			return element.slice(1)
		}
		return element
	});
	const handleCollMap = e => {
		e.preventDefault();
		if (collMap) {
			setCollMap(false);
		} else {
			setCollMap(true);
		}
	}

	return (
		<div className="productPageCharacterMapBlock" style={collMap ? { paddingBottom: 0 } : { paddingBottom: '18px' }} >

				{address == undefined ? <div className="placeholder_animation product__placeholder_address"></div> :
					<div className="productPageCharacterLocality">
						{/* {mobile && <div className="productLocality">Местоположение</div>} */}
						{/* <div>{address == undefined ? '' : address.length > 45 ? address.slice(0, 45) + '...' : address}</div> */}
						<p className='productLocality'>{formatingAddress[0]}</p>
						<p className='productLocality'>{formatingAddress[1] + ' ' + formatingAddress[2]}</p>
						<a className={`productPageCharacterMapSwitch highlight underline ${collMap ? ('') : ('collMapSw')}`} onClick={e => handleCollMap(e)}>Показать на карте</a>
						<span></span>
					</div>

				}
				<div className="productPageCharacterMap" style={collMap ? { height: 0 } : { height: '400px' }}>
					{/* проблема с CORS */}
					{/* <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ade278bb067489a15a031480c20e3318914d391acd3e1995348d759fa5baa2167&amp;source=constructor" width="618" height="400" frameBorder="0"></iframe> */}
					{coordinates && <ProductYMAP coordinates={JSON.parse(coordinates)} width={'100%'} height={400}/>}
				</div>
			</div>
	)
}


export default ProductMap;