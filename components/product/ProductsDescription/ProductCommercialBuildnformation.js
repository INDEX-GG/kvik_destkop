import {makeStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {UnmountClosed} from "react-collapse";
import ProductDescription from "../ProductDescription";
import ToggleButton from "./ToggleButton";
import ProductInformationPlaceHolder
    from "../../placeHolders/ProductInformationPlaceHolder/ProductInformationPlaceHolder";


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

const ProductCommercialBuildnformation = ({data, mobile, description, productData}) => {
    const classes = useClass()
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
            setProducts([...productData?.filter(el => el.alias !== "communications" && el.alias !== "additionally" && el.alias !== "infrastructure" && el.alias !== "possible_appointment" && el.alias !== "included"),
                {alias: "desc"},
                ...productData?.filter(el => el.alias === "communications" || el.alias === "additionally" || el.alias === "infrastructure" || el.alias === "possible_appointment" || el.alias === "included")])
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
                                if (el.alias === "floor_home") return null
                                if (el.alias === "storey") {
                                    return <div className="productWrap" key={i} style={{border: "none"}}>
                                        <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                        <pre className='productDescription'
                                             style={{margin: "14px 0"}}>{data[el.alias]} ???? {data['floor_home']}</pre>
                                    </div>
                                }
                                if (el.alias === "security_payment") return (
                                    <div className="productWrap" key={i} style={{border: "none"}}>
                                        <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                        <pre className='productDescription'
                                             style={{margin: "14px 0"}}>{data[el.alias]} ???</pre>
                                    </div>
                                )
                                if (el.alias === "area") return (
                                    <div className="productWrap" key={i} style={{border: "none"}}>
                                        <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                        <pre className='productDescription'
                                             style={{margin: "14px 0"}}>{data[el.alias]} ????</pre>
                                    </div>
                                )
                                if (el.alias === "build_year") return (
                                    <div className="productWrap" key={i} style={{border: "none"}}>
                                        <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                        <pre className='productDescription'
                                             style={{margin: "14px 0"}}>{data[el.alias]} ??.</pre>
                                    </div>
                                )
                                if (el.alias === "ceiling_height") return (
                                    <div className="productWrap" key={i} style={{border: "none"}}>
                                        <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                        <pre className='productDescription'
                                             style={{margin: "14px 0"}}>{data[el.alias]} ??.</pre>
                                    </div>
                                )
                                if (el.alias === "communications" || el.alias === "additionally" || el.alias === "infrastructure" || el.alias === "possible_appointment" || el.alias === "included") {
                                    return <div className="productWrap" key={i} style={{
                                        display: !mobile ? 'flex' : null,
                                        flexDirection: !mobile ? "column" : null,
                                        alignItems: 'flex-start',
                                        borderBottom: "1px solid #e9e9e9"
                                    }}>
                                        <div className="productLocality">{el.name}</div>
                                        <div className={classes.descriptionPlaseholder} style={
                                            {
                                                display: "grid",
                                                padding: 0,
                                                gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(1, 1fr)",
                                                width: "70%"
                                            }}
                                        >{data[el.alias].split(',').map((des, key) => <div
                                            className={classes.descriptionItem} key={key}>{des}</div>)}</div>
                                    </div>
                                }


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
                                    if (el.alias === "floor_home") return null
                                    if (el.alias === "storey") {
                                        return <div className="productWrap" key={i} style={{border: "none"}}>
                                            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                            <pre className='productDescription'
                                                 style={{margin: "14px 0"}}>{data[el.alias]} ???? {data['floor_home']}</pre>
                                        </div>
                                    }
                                    if (el.alias === "security_payment") return (
                                        <div className="productWrap" key={i} style={{border: "none"}}>
                                            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                            <pre className='productDescription'
                                                 style={{margin: "14px 0"}}>{data[el.alias]} ???</pre>
                                        </div>
                                    )
                                    if (el.alias === "area") return (
                                        <div className="productWrap" key={i} style={{border: "none"}}>
                                            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                            <pre className='productDescription'
                                                 style={{margin: "14px 0"}}>{data[el.alias]} ????</pre>
                                        </div>
                                    )
                                    if (el.alias === "build_year") return (
                                        <div className="productWrap" key={i} style={{border: "none"}}>
                                            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                            <pre className='productDescription'
                                                 style={{margin: "14px 0"}}>{data[el.alias]} ??.</pre>
                                        </div>
                                    )
                                    if (el.alias === "ceiling_height") return (
                                        <div className="productWrap" key={i} style={{border: "none"}}>
                                            <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                            <pre className='productDescription'
                                                 style={{margin: "14px 0"}}>{data[el.alias]} ??.</pre>
                                        </div>
                                    )
                                    if (el.alias === "communications" || el.alias === "additionally" || el.alias === "infrastructure" || el.alias === "possible_appointment" || el.alias === "included") {
                                        return <div className="productWrap" key={i} style={{
                                            display: !mobile ? 'flex' : null,
                                            flexDirection: !mobile ? "column" : null,
                                            alignItems: 'flex-start',
                                            borderBottom: "1px solid #e9e9e9"
                                        }}>
                                            <div className="productLocality">{el.name}</div>
                                            <div className={classes.descriptionPlaseholder} style={
                                                {
                                                    display: "grid",
                                                    padding: 0,
                                                    gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(1, 1fr)",
                                                    width: "70%"
                                                }}
                                            >{data[el.alias].split(',').map((des, key) => <div
                                                className={classes.descriptionItem} key={key}>{des}</div>)}</div>
                                        </div>
                                    }


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
                                if (el.alias === "floor_home") return null
                                if (el.alias === "storey") {
                                    return <div className="productWrap" key={i} style={{border: "none"}}>
                                        <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                        <pre className='productDescription'
                                             style={{margin: "14px 0"}}>{data[el.alias]} ???? {data['floor_home']}</pre>
                                    </div>
                                }
                                if (el.alias === "security_payment") return (
                                    <div className="productWrap" key={i} style={{border: "none"}}>
                                        <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                        <pre className='productDescription'
                                             style={{margin: "14px 0"}}>{data[el.alias]} ???</pre>
                                    </div>
                                )
                                if (el.alias === "area") return (
                                    <div className="productWrap" key={i} style={{border: "none"}}>
                                        <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                        <pre className='productDescription'
                                             style={{margin: "14px 0"}}>{data[el.alias]} ????</pre>
                                    </div>
                                )
                                if (el.alias === "build_year") return (
                                    <div className="productWrap" key={i} style={{border: "none"}}>
                                        <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                        <pre className='productDescription'
                                             style={{margin: "14px 0"}}>{data[el.alias]} ??.</pre>
                                    </div>
                                )
                                if (el.alias === "ceiling_height") return (
                                    <div className="productWrap" key={i} style={{border: "none"}}>
                                        <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                        <pre className='productDescription'
                                             style={{margin: "14px 0"}}>{data[el.alias]} ??.</pre>
                                    </div>
                                )
                                if (el.alias === "desc") return <ProductDescription description={description}
                                                                                    mobile={mobile}
                                                                                    style={{borderTop: "1px solid #e9e9e9"}}/>
                                if (el.alias === "communications" || el.alias === "additionally" || el.alias === "infrastructure" || el.alias === "possible_appointment" || el.alias === "included") {
                                    return <div className="productWrap" key={i} style={{
                                        display: !mobile ? 'flex' : null,
                                        flexDirection: !mobile ? "column" : null,
                                        alignItems: 'flex-start',
                                        borderBottom: "1px solid #e9e9e9"
                                    }}>
                                        <div className="productLocality">{el.name}</div>
                                        <div className={classes.descriptionPlaseholder} style={
                                            {
                                                display: "grid",
                                                padding: 0,
                                                gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(1, 1fr)",
                                                width: "70%"
                                            }}
                                        >{data[el.alias].split(',').map((des, key) => <div
                                            className={classes.descriptionItem} key={key}>{des}</div>)}</div>
                                    </div>
                                }


                                return <div className="productWrap" key={i} style={{border: "none"}}>
                                    <div className="productLocality" style={{padding: "14px 0"}}>{el.name}</div>
                                    <pre className='productDescription'
                                         style={{margin: "14px 0"}}>{data[el.alias]}</pre>
                                </div>

                            }


                        })}
                    </div>
                }


                {fieldsCount > 3 && !mobile ?
                    <ToggleButton text="?????? ??????????????????" top={hide} onClick={() => setHide(!hide)}/> : null}
            </>
    )


}
export default ProductCommercialBuildnformation;
