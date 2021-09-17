import React from 'react';
import { useMedia } from '../../hooks/useMedia';
import ProductAutoInformation from './ProductAutoInformation';
import ProductDescription from './ProductDescription';
import ProductMap from './ProductMap';
// import ProductProperties from './ProductProperties';
import ProductSocial from './ProductSmallComponents/ProductSocial';

export default function ProductInformation({productionInfo, description, address, caterory}) {
	console.log("я правильно понимаю", productionInfo)

	const { matchesMobile, matchesTablet } = useMedia();

	// const testProperties = [{name: "Тип дома", desc: 'Кирпичный'}, {name: "Этаж", desc: '5 из 16'}, {name: "Количество комнта", desc: '2'}]

	let info = null
	switch (caterory){
		case "auto":
			info = <ProductAutoInformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} />
			break;
		default:
			info = <ProductDescription description={description} mobile={!matchesMobile && !matchesTablet}/>
	}

	return (
		<>
			<ProductMap address={address} mobile={!matchesMobile && !matchesTablet}/>
			<div className="productPageCharacter thin">
				{info}
				<ProductSocial/>
			</div>
		</>
	)
}
