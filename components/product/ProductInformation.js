import React from 'react';
import { useMedia } from '../../hooks/useMedia';
import ProductDescription from './ProductDescription';
import ProductMap from './ProductMap';
// import ProductProperties from './ProductProperties';
import ProductSocial from './ProductSmallComponents/ProductSocial';

export default function ProductInformation(data) {
	console.log(data.description)

	const { matchesMobile, matchesTablet } = useMedia();

	// const testProperties = [{name: "Тип дома", desc: 'Кирпичный'}, {name: "Этаж", desc: '5 из 16'}, {name: "Количество комнта", desc: '2'}]

	return (
		<>
			<ProductMap address={data.address} mobile={!matchesMobile && !matchesTablet}/>
			<div className="productPageCharacter thin">
				{matchesMobile || matchesTablet ? <ProductDescription description={data.description} mobile={!matchesMobile && !matchesTablet}/> : ''}
				{/* {testProperties.map((item, index) => {
					return (
						<ProductProperties key={index + 1} name={item.name} desc={item.desc}/>
					)
				})} */}
				{matchesMobile || matchesTablet ? '' : 
				<ProductDescription description={data.description} mobile={!matchesMobile && !matchesTablet}/>}
				<ProductSocial/>
			</div>
		</>
	)
}
