import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { UnmountClosed } from "react-collapse";
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
}))

const ProductSuburbanBuildnformation = ({data, mobile, description, productData}) => {
  const classes = useClass()
  const [hide, setHide] = useState(true)
	const [fieldsCount, setFieldsCount] = useState(0)
	const [products, setProducts] = useState([])


	useEffect(() => {
		let count = 0
		for (let key in data){
			if (key !== "id" && key !== "post_id" && key !== "subcategory"){
				// console.log(key);
				if (data[key]) count++
			}
		}
		setFieldsCount(count)
    if (productData){
      setProducts([...productData?.filter(el => el.alias !=="communications" && el.alias !=="additionally" && el.alias !=="accommodations" && el.alias !=="multimedia" && el.alias !=="facilities"),
      {alias: "desc"},
      ...productData?.filter(el => el.alias ==="communications" || el.alias ==="additionally" || el.alias ==="accommodations" || el.alias ==="multimedia" || el.alias ==="facilities")])
    }

	}, [data])


	return (
		data.id == undefined ? 
		<div style={{order: 0}} className="placeholder_animation product__placeholder_description"></div> :
		<>
      {fieldsCount > 3 && !mobile ? 
      <div style={{display: "flex", flexDirection: "column"}}>
        {!mobile && <ProductDescription description={description} mobile={mobile} style={{borderBottom: "1px solid #e9e9e9"}}/>}
        {products?.slice(0,3).map((el, i) => {
         if(data[el.alias] || el.alias === 'desc'){
          if (el.alias === "number_of_storeys") {
            return <div className="productWrap" key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} из {data['floor_home']}</pre>
            </div>
          }
          if (el.alias ==="pledge") return (
            <div className="productWrap" key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} ₽</pre>
            </div>
          )
          if (el.alias ==="home_area" || el.alias ==="land_area") return (
            <div className="productWrap" key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} м²</pre>
            </div>
          )
          if (el.alias ==="build_year" || el.alias ==="tv_year") return (
            <div className="productWrap" key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} г.</pre>
            </div>
          )
          if (el.alias ==="ceiling_height") return (
            <div className="productWrap" key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} м.</pre>
            </div>
          )

          if (el.alias ==="communications" || el.alias ==="additionally" || el.alias ==="accommodations" || el.alias ==="multimedia" || el.alias ==="facilities"){
                return <div className="productWrap" key={i} style={{
                  display:! mobile ? 'flex' : null,
                  flexDirection: !mobile ? "column" : null,
                  alignItems: 'flex-start',
                  borderBottom: "1px solid #e9e9e9"
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


          return <div className="productWrap" key={i} style={{border: "none"}}>
          <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
          <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]}</pre>
          </div>

        }
        
			})}
      <UnmountClosed isOpened={!hide}  >
        {products?.slice(3).map((el, i) => {
         if(data[el.alias] || el.alias === 'desc'){
          if (el.alias === "number_of_storeys") {
            return <div className="productWrap" key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} из {data['floor_home']}</pre>
            </div>
          }
          if (el.alias ==="pledge") return (
            <div className="productWrap" key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} ₽</pre>
            </div>
          )
          if (el.alias ==="home_area" || el.alias ==="land_area") return (
            <div className="productWrap" key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} м³</pre>
            </div>
          )
          if (el.alias ==="build_year" || el.alias ==="tv_year") return (
            <div className="productWrap" key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} г.</pre>
            </div>
          )
          if (el.alias ==="ceiling_height") return (
            <div className="productWrap" key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} м.</pre>
            </div>
          )
          if (el.alias ==="communications" || el.alias ==="additionally" || el.alias ==="accommodations" || el.alias ==="multimedia" || el.alias ==="facilities"){
                return <div className="productWrap" key={i} style={{
                  display:! mobile ? 'flex' : null,
                  flexDirection: !mobile ? "column" : null,
                  alignItems: 'flex-start',
                  borderBottom: "1px solid #e9e9e9"
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


          return <div className="productWrap" key={i} style={{border: "none"}}>
          <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
          <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]}</pre>
          </div>

        }
          
        })}
      </UnmountClosed>
      </div>
      :
      <div className={`productPageWrap`} style={{display: "flex", flexDirection: "column"}}>
      {products?.map((el, i) => {
         if(data[el.alias] || el.alias === 'desc'){
          if (el.alias === "number_of_storeys") {
            return <div className="productWrap" key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} из {data['floor_home']}</pre>
            </div>
          }
          if (el.alias ==="pledge") return (
            <div className="productWrap" key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} ₽</pre>
            </div>
          )
          if (el.alias ==="home_area" || el.alias ==="land_area") return (
            <div className="productWrap" key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} м³</pre>
            </div>
          )
          if (el.alias ==="build_year" || el.alias ==="tv_year") return (
            <div className="productWrap" key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} г.</pre>
            </div>
          )
          if (el.alias ==="ceiling_height") return (
            <div className="productWrap" key={i} style={{border: "none"}}>
            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
            <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]} м.</pre>
            </div>
          )
          if (el.alias === "desc") return <ProductDescription description={description} mobile={mobile} style={{borderTop: "1px solid #e9e9e9"}} />

          if (el.alias ==="communications" || el.alias ==="additionally" || el.alias ==="accommodations" || el.alias ==="multimedia" || el.alias ==="facilities"){
                return <div className="productWrap" key={i} style={{
                  display:! mobile ? 'flex' : null,
                  flexDirection: !mobile ? "column" : null,
                  alignItems: 'flex-start',
                  borderBottom: "1px solid #e9e9e9"
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


          return <div className="productWrap" key={i} style={{border: "none"}}>
          <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
          <pre className='productDescription' style={{margin: "14px 0"}}>{data[el.alias]}</pre>
          </div>

        }
        
        
			})}
      </div> 
      }
      

      {fieldsCount > 3 && !mobile ? <ToggleButton text="Все параметры" top={hide} onClick={() => setHide(!hide)} /> : null}
    </>
  )
}
export default ProductSuburbanBuildnformation;
