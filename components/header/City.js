import { makeStyles, TextField } from "@material-ui/core"
import axios from "axios";
import Search from '../../UI/icons/Search';
import { useCity } from "../../lib/Context/CityCTX"
import { useState } from "react";
import { RedoSharp } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
       cityContainer: {
      width: "600px",
      maxWidth: "600px"
   },
   cityTitle: {
      textAlign: "center",
      color: "#2C2C2C",
      fontWeight: "500",
      margin: "14px 0px 8px"
   },
   citySearch: {
      textAlign: "center",
      marginBottom: "12px",
      position: "relative"
   },
   cityInput: {
      maxWidth: "400px",
      width: "100%",
      height: "32px",
   },
   cityInputIcon: {
      position: "absolute",
      right: "120px",
      top: "5px"
   },
   citySubTitle: {
      textAlign: "center",
      fontSize: '12px',
      color: "#C7C7C7",
      marginBottom: "12px"
   },
   cityBox: {
      display: "flex",
      flexWrap: "wrap",
      padding: "0 8px",
      marginBottom: "8px"
   },
   city: {
      width: "192px",
      padding: "6px 0 11px 32px",
      color: "#C7C7C7",
      margin: "0 2px 2px 0",
      "&:hover": {
         backgroundColor: "#E9E9E9",
         borderRadius: "2px"
      }
   },
   cityActive: {
      color: "#2C2C2C",
      backgroundColor: "#E9E9E9",
      borderRadius: "2px"
   }
}))



export default function City({dialog, setDialog}) {

   const {city, changeCity} = useCity()
   const [cityActive, setCityActive] = useState(false)
   const startArrCity = [{name: "Москва"}, {name: "Ростов-на-Дону"}, {name: "Тюмень"}, {name: "Санкт-Петербург"}, {name: "Уфа"}, {name: "Ижевск"}, {name: "Екатеринбург"}, {name: "Красноярск"}, {name: "Барнаул"}, {name: "Новосибирск"}, {name: "Пермь"}, {name: "Ульяновск"}, {name: "Нижний Новгород"}, {name: "Волгоград"}, {name: "Иркутск"}, {name: "Казань"}, {name: "Воронеж"}, {name: "Владивосток"}, {name: "Самара"}, {name: "Саратов"}, {name: "Ярославль"}, {name: "Челябинск"}, {name: "Краснодар"}, {name: "Хабаровск"}, {name: "Омск"}, {name: "Тольятти"}, {name: "Оренбург"}]

   const [cityArr, setCityArr] = useState(startArrCity)


   const classes = useStyles()


   // axios.post("/api/getCities").then((res) => console.log(res))

   // useEffect(() => {

   // })

   async function changeCityes(e) {
      const value = e.target.value
      if (e.target.value.length > 0) {
         await axios.post("/api/citySearch", {name: value}).then((res) => setCityArr(res.data.map(item => item.object))) 
         // Если нужно убрать parent_id 113 (Области) filter(item => item.parent_id != 113)
         console.log(cityArr.length)
         return;
      }

      setCityArr(startArrCity)
   }


    return (
        <div className={classes.cityContainer}>
            <div className={classes.cityTitle}>Город или регион</div>
            <div className={classes.citySearch}>
                <TextField onChange={(e) => changeCityes(e)} variant="outlined" placeholder="Ваш населенный пункт, район?" className={classes.cityInput}/>
                <div className={classes.cityInputIcon}>
                    <Search/>
                </div>
            </div>
            <div className={classes.citySubTitle}>Или выбирите из списка</div>
            <div className={classes.cityBox}>
                { 
                cityArr.map(item => {
                return <div onClick={() => {
                  changeCity(item.name)
                  setDialog(!dialog)
                }} 
                className={`${classes.city} ${item.name == city ? classes.cityActive : ""}`}>
                {item.name}
                </div>})
               }
            </div>
        </div>
    )
}