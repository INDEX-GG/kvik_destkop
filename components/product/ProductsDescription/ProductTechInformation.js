import { makeStyles } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import ProductDescription from "../ProductDescription";
import ToggleButton from "./ToggleButton";


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
  hide: {
    '& > div:nth-child(-n+3)': {
      display: 'flex'
    },
    '& > div' : {
      display: 'none'
    } 
  }

}))

const ProductTechInformation = ({data, mobile, description, productData}) => {
  const classes = useClass()
  const [hide, setHide] = useState(true)
	const [fieldsCount, setFieldsCount] = useState(0)
  const ref = useRef(null)

	useEffect(() => {
		let count = 0
		for (let key in data){
			if (key !== "id" && key !== "post_id" && key !== "subcategory"){
				console.log(key);
				if (data[key]) count++
			}
		}
		setFieldsCount(count)
	}, [data])

  // console.log("1231qwdeadQAWD", ref.current?.offsetHeight);
	return (
		data.id == undefined ? 
		<div style={{order: 0}} className="placeholder_animation product__placeholder_description"></div> :
		<>
      {!mobile && <ProductDescription description={description} mobile={mobile} />}
      <div ref={ref} className={`productPageWrap ${hide && fieldsCount > 3  ? classes.hide : ''}`} style={{display: "flex", flexDirection: "column"}}>
      {productData?.map((el, i) => {
        if(data[el.alias]){
          if (el.alias ==="features" || 
          el.alias ==="body_material" || 
          el.alias ==="connectors_and_interfaces" || 
          el.alias ==="features_of_the" || 
          el.alias ==="features_of_the_body" || 
          el.alias ==="smart_communication") return null
          if (el.alias ==="pledge") return (
            <div key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} ₽</pre>
            </div>
          )
          if (el.alias ==="charge_power") return (
            <div key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} Вт</pre>
            </div>
          )
          if (el.alias ==="the_weight" || el.alias ==="tv_year") return (
            <div key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} г.</pre>
            </div>
          )
          if (el.alias ==="tv_diagonal" ) return (
            <div key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} ″</pre>
            </div>
          )
          if (el.alias ==="ceiling_height") return (
            <div key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} м.</pre>
            </div>
          )

          return <div key={i} style={{border: "none"}}>
          <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
          <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]}</pre>
          </div>
        }
        
			})}
      {mobile && <ProductDescription description={description} mobile={mobile} style={{borderTop: "1px solid #e9e9e9"}} />} 
      {productData?.map((el, i) => {
        if (data[el.alias]){
          if (el.alias ==="features" || 
              el.alias ==="body_material" || 
              el.alias ==="connectors_and_interfaces" || 
              el.alias ==="features_of_the" || 
              el.alias ==="features_of_the_body" || 
              el.alias ==="smart_communication"){
                return <div key={i} style={{
                  display:! mobile ? 'flex' : null,
                  flexDirection: !mobile ? "column" : null
                }}>
                  <div className="productLocality">{el.name}</div>
                  <div className={classes.descriptionPlaseholder} style={
                    {display: "grid",
                    padding: 0,
                    gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(1, 1fr)",
                    width: "70%"}}
                  >{data[el.alias].split(',').map((des, key) => <div className={classes.descriptionItem} key={key}>{des}</div>)}</div>
                </div>
          }
        }
      })}
      </div> 
      {fieldsCount > 3 ? <ToggleButton text="Все параметры" onClick={() => setHide(!hide)} /> : null}

		</>
				
	)
}
export default ProductTechInformation;
