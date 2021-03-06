import {makeStyles} from "@material-ui/core";
import InfoItem from "./InfoItem";
// import ProductDescription from "../ProductDescription";
import React, {useState} from "react";
import ProductInformationPlaceHolder
    from "../../placeHolders/ProductInformationPlaceHolder/ProductInformationPlaceHolder";


const useClass = makeStyles(() => ({
    autoPlaceholder: {
        // display: "flex",
        flexDirection: 'column',
        flexWrap: 'wrap',
        // maxHeight: 420,
        maxHeight: '170px',
        fontSize: 14,
        padding: "10px 16px",
        overflow: 'hidden',
    },
    autoPlaceHolderActive: {
        display: "flex",
        flexDirection: 'column',
        flexWrap: 'wrap',
        maxHeight: '100%',
        fontSize: 14,
        padding: "10px 16px",
        overflow: 'hidden'
    },
    title: {
        color: "#8F8F8F",
        marginRight: 4,
    },
    content: {
        color: "#2C2C2C"
    },
    descriptionPlaseholder: {
        // display: 'flex',
        // flexDirection: "column",
        // flexWrap: "wrap",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        // maxHeight: 250,
        // width: "100%"
    },
    descriptionItem: {
        padding: "18px 0",
    },
}))

const autoDataReq = [
    {
        "alias": "modelsAuto",
        "name": "Марка:",
    },
    {
        "alias": "submodels",
        "name": "Модель:",
    },
    {
        "alias": "vine",
        "name": "VIN (номер кузова):",
    },
    {
        "alias": "bodytype",
        "name": "Тип кузова:",
    },
    {
        "alias": "year",
        "name": "Год выпуска:",
    },
    {
        "alias": "generation",
        "name": "Поколение:",
    },
    {
        "alias": "modification",
        "name": "Модификация:",
    },
    {
        "alias": "complectations",
        "name": "Комплектация:",
    },
    {
        "alias": "drivetype",
        "name": "Привод:",
    },
    {
        "alias": "transmission",
        "name": "Коробка передач:",
    },
    {
        "alias": "fueltype",
        "name": "Двигатель:",
    },
    {
        "alias": "enginesize",
    },
    {
        "alias": "GBO",
        "name": "ГБО:"
    },
    {
        "alias": "steering_wheel",
        "name": "Руль:",
    },
    {
        "alias": "type_park_auto",
        "name": "Тип:",
    },
    {
        "alias": "mileage",
        "name": "Пробег:",
    },
    {
        "alias": "power",
        "name": "Мощность:",
    },
    {
        "alias": "color",
        "name": "Цвет:",
    },
    {
        "alias": "salon",
        "name": "Салон:",
    },
    {
        "alias": "tires_and_rims",
        "name": "Шины и диски:",
    },
    {
        "alias": "set_tires",
    },
    {
        "alias": "condition",
        "name": "Состояние:",
    },
    {
        "alias": "owners_of_pts",
        "name": "Владельцев по ПТС:",
    },
    {
        "alias": "documents",
        "name": "Документы:",
    },
]
const autoData = [
    {
        "alias": "driving_assistance",
        "name": "Помощь при вождении",
    },
    {
        "alias": "heating_auto",
        "name": "Обогрев",
    },
    {
        "alias": "antitheft_system",
        "name": "Противоугонная система",
    },
    {
        "alias": "support_systems",
        "name": "Вспомогательные системы",
    },
    {
        "alias": "airbags",
        "name": "Подушка безопасности",
    },
    {
        "alias": "multimedia_and_navigation",
        "name": "Мультимедиа и навигация",
    },
]
// const ProductAutoInformation = ({data, mobile, description}) => {
const ProductAutoInformation = ({data, mobile}) => {
    const classes = useClass()
    const [isOpenDescription, setIsOpenDescription] = useState(false)

    function showMoreClickHandler(event) {
        console.log(event)
        setIsOpenDescription(!isOpenDescription)
    }

    function classSwitcher() {
        if(isOpenDescription) return classes.autoPlaceHolderActive
        if(!isOpenDescription) return classes.autoPlaceholder
    }

    // if (data)
    return (
        data.vine === undefined  ? <ProductInformationPlaceHolder/> :
            <>
                <div className={classSwitcher()} style={{
                    flexWrap: mobile ? 'wrap' : "nowrap",
                    // maxHeight: mobile ? null : '100%'
                }}>
                    <div className="productDescriptionTitle">О автомобиле</div>
                    <span className='productDescriptionunderLine'></span>
                    <div className="productAbout">
                        {autoDataReq.map((el, key) => {
                            if (!el.name) {
                                return null
                            }
                            if (el.alias === 'fueltype') {
                                return <InfoItem mobile={mobile} key={key} name={el.name}
                                                desc={`${data[el.alias]} ${data['enginesize'] !== null ? data['enginesize'] : ''}`}/>
                            }
                            if (el.alias === 'GBO') {
                                if (data[el.alias] !== null) return <InfoItem mobile={mobile} key={key} name={el.name}
                                                                            desc={`${data[el.alias] === true ? "Есть" : "Нет"}`}/>
                                return null
                            }
                            if (el.alias === 'mileage') {
                                return <InfoItem mobile={mobile} key={key} name={el.name} desc={`${data[el.alias]} км.`}/>
                            }
                            if (el.alias === 'tires_and_rims') {
                                return <InfoItem mobile={mobile} key={key} name={el.name}
                                                desc={data[el.alias] ? `${data[el.alias]}” ${data['set_tires']}` : data['set_tires']}/>
                            }
                            return <InfoItem mobile={mobile} key={key} name={el.name} desc={data[el.alias]}/>
                        })}
                    </div>
                </div>
                {/* в новом дизайне не нужно */}
                {/* <ProductDescription description={description} mobile={mobile}
                                    style={{borderTop: "1px solid #e9e9e9", borderBottom: "1px solid #e9e9e9"}}/> */}
                {/* в новом дизайне не нужно */}
                {autoData.map((el, i) => (data[el.alias] ? 
                <div key={i} style={{
                    display: 'flex',
                    flexDirection: !mobile ? "column" : null,
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
                    >
                        {data[el.alias].split(',').map((des, key) => <div className={classes.descriptionItem}
                            key={key}>{des}</div>)}
                    </div>
                </div> : 
                null))}

                {/* <span className='productShowMore'>Показать больше</span> */}
                {!isOpenDescription && <button onClick={showMoreClickHandler} className='productShowMore'>Показать больше</button>}
				{isOpenDescription && <button onClick={showMoreClickHandler} className='productHide'>Скрыть</button>}
            </>

    )
}
export default ProductAutoInformation;
