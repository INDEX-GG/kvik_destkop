import ProductDescription from "../ProductDescription";

const ProductForHomeInformation = ({data, mobile, description, productData}) => {

	return (
		data.id == undefined ? 
		<div style={{order: 0}} className="placeholder_animation product__placeholder_description"></div> :
		<>
      {!mobile && <ProductDescription description={description} mobile={mobile} />} 
      {productData?.map((el, i) => {
        if(data[el.alias]){

          return <div key={i} style={{border: "none"}}>
          <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
          <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]}</pre>
          </div>
        }
        
			})}
      {mobile && <ProductDescription description={description} mobile={mobile} style={{borderTop: "1px solid #e9e9e9"}} />} 


		</>
				
	)
}
export default ProductForHomeInformation;
