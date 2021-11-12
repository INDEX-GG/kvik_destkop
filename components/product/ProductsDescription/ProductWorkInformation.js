import React, {useEffect, useState} from "react";
import {UnmountClosed} from "react-collapse";
import ProductDescription from "../ProductDescription";
import ToggleButton from "./ToggleButton";
import ProductInformationPlaceHolder
    from "../../placeHolders/ProductInformationPlaceHolder/ProductInformationPlaceHolder";

const ProductWorkInformation = ({data, mobile, description, productData}) => {

    const [hide, setHide] = useState(true)
    const [fieldsCount, setFieldsCount] = useState(0)
    const [products, setProducts] = useState([])


    useEffect(() => {
        let count = 0
        for (let key in data) {
            if (key !== "id" && key !== "post_id" && key !== "subcategory") {
                // console.log(key);
                if (data[key]) count++
            }
        }
        setFieldsCount(count)
        if (productData) {
            setProducts([...productData, {alias: "desc"}])
        }

    }, [data])


    return (
        data.id == undefined ? <ProductInformationPlaceHolder/> :
            <>
                {fieldsCount > 3 && !mobile ?
                    <div style={{display: "flex", flexDirection: "column"}}>
                        {!mobile && <ProductDescription description={description} mobile={mobile}
                                                        style={{borderBottom: "1px solid #e9e9e9"}}/>}
                        {products?.slice(0, 3).map((el, i) => {
                            if (data[el.alias] || el.alias === 'desc') {

                                return <div className="productWrap" key={i} style={{border: "none"}}>
                                    <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                    <pre className='productDescription'
                                         style={{margin: "14px 0"}}>{data[el.alias]}</pre>
                                </div>

                            }

                        })}
                        <UnmountClosed isOpened={!hide}>
                            {products?.slice(3).map((el, i) => {
                                if (data[el.alias] || el.alias === 'desc') {

                                    return <div className="productWrap" key={i} style={{border: "none"}}>
                                        <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                        <pre className='productDescription'
                                             style={{margin: "14px 0"}}>{data[el.alias]}</pre>
                                    </div>

                                }

                            })}
                        </UnmountClosed>
                    </div>
                    :
                    <div className={`productPageWrap`} style={{display: "flex", flexDirection: "column"}}>
                        {products?.map((el, i) => {
                            if (data[el.alias] || el.alias === 'desc') {
                                if (el.alias === "desc") return <ProductDescription description={description}
                                                                                    mobile={mobile}
                                                                                    style={{borderTop: "1px solid #e9e9e9"}}/>

                                return <div key={i} style={{border: "none"}}>
                                    <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                    <pre className='productDescription'
                                         style={{margin: "14px 0"}}>{data[el.alias]}</pre>
                                </div>

                            }

                        })}
                    </div>
                }


                {fieldsCount > 3 && !mobile ?
                    <ToggleButton text="Все параметры" top={hide} onClick={() => setHide(!hide)}/> : null}
            </>

    )
}
export default ProductWorkInformation;
