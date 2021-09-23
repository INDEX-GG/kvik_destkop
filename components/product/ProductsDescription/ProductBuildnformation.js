import { makeStyles } from "@material-ui/core";
import ProductDescription from "../ProductDescription";


const useClass = makeStyles(() => ({
  autoPlaceholder: {
    display: "flex",
    flexDirection: 'column',
    flexWrap: 'wrap',
    maxHeight: 420,
    fontSize: 14,
    padding: "10px 0"
  },
  descriptionPlaseholder: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  descriptionItem: {
    padding: "18px 0",
  },
}))

const ProductBuildInformation = ({data, mobile, description, productData}) => {
  const classes = useClass()

	return (
		data.id == undefined ? 
		<div style={{order: 0}} className="placeholder_animation product__placeholder_description"></div> :
		<>
      {!mobile && <ProductDescription description={description} mobile={mobile} />} 
      {productData?.map((el, i) => {
        if(data[el.alias]){
          if (el.alias === "floor_home") return null
          if (el.alias === "storey") {
            return <div key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} из {data['floor_home']}</pre>
            </div>
          }
          if (el.alias ==="pledge") return (
            <div key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} ₽</pre>
            </div>
          )
          if (el.alias ==="area") return (
            <div key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} м³</pre>
            </div>
          )
          if (el.alias ==="ceiling_height") return (
            <div key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} м.</pre>
            </div>
          )
          if (el.alias ==="accommodations" || el.alias ==="facilities" || el.alias ==="infrastructure") return null

          return <div key={i} style={{border: "none"}}>
          <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
          <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]}</pre>
          </div>
        }
        
			})}
      {mobile && <ProductDescription description={description} mobile={mobile} style={{borderTop: "1px solid #e9e9e9"}} />} 
      {productData?.map((el, i) => {
        if (data[el.alias]){
          if (el.alias ==="accommodations" || el.alias ==="facilities" || el.alias ==="infrastructure"){
            return <div key={i} style={{
              display:! mobile ? 'flex' : null,
              flexDirection: !mobile ? "column" : null
            }}>
              <div className="productLocality">{el.name}</div>
              <div className={classes.descriptionPlaseholder} style={
                {display: "grid",
                padding: 0,
                gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(1, 1fr)",
                width: "100%"}}
              >{data[el.alias].split(',').map((des, key) => <div className={classes.descriptionItem} key={key}>{des}</div>)}</div>
            </div>
          }
        }
      })}


		</>
				
	)
}
export default ProductBuildInformation;
