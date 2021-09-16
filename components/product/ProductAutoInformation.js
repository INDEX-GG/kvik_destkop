import { makeStyles } from "@material-ui/core";
import ProductDescription from "./ProductDescription";


const useClass = makeStyles(() => ({
  autoPlaceholder: {
    display: "flex",
    flexDirection: 'column',
    flexWrap: 'wrap',
    maxHeight: 420,
    fontSize: 14,
    padding: "10px 0"
  },
  title: {
    color: "#8F8F8F",
    marginRight: 4,
  },
  content: {
    color: "#2C2C2C"
  }
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

const ProductAutoInformation = ({data, mobile, description}) => {
  const classes = useClass()


	return (
		data.vine == undefined ? 
		<div style={{order: 0}} className="placeholder_animation product__placeholder_description"></div> :
		<>
			<div className={classes.autoPlaceholder} style={{
        flexWrap: mobile ? 'wrap' : "nowrap",
        maxHeight: mobile ? null : '100%'
      }}>
        {autoDataReq.map((el, key) => {
          if (!el.name) {
            return null
          }
          if (el.alias === 'fueltype'){
            return <InfoItem mobile={mobile} key={key} name={el.name} desc={`${data[el.alias]} ${data['enginesize']}`} /> 
          }
          if (el.alias === 'mileage'){
            return <InfoItem mobile={mobile} key={key} name={el.name} desc={`${data[el.alias]} км.`} /> 
          }
          if (el.alias === 'tires_and_rims'){
            return <InfoItem mobile={mobile} key={key} name={el.name} desc={`${data[el.alias]}” ${data['set_tires']}`} /> 
          }
          return <InfoItem mobile={mobile} key={key} name={el.name} desc={data[el.alias]} /> 
        })}
			</div>
      <ProductDescription description={description} mobile={mobile}/>


		</>
				
	)
}
export default ProductAutoInformation;

const InfoItem = ({name, desc, mobile}) => {
  const classes = useClass()
  return <div style={ {
    display: 'flex',
    alignItems: "flex-start",
    width: mobile ? '50%' : "100%",
    padding: "10px 0",

  }}>
    <div className={classes.title}>{name}</div>
    <pre className={classes.content}>{desc}</pre>
  </div>
}
