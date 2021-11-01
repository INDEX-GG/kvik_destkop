import {makeStyles, TextField} from "@material-ui/core"
import axios from "axios";
import Search from '../../UI/icons/Search';
import {useCity} from "../../lib/Context/CityCTX"
import {useState} from "react";
import {BASE_URL} from "../../lib/constants";
import {useAuth} from "../../lib/Context/AuthCTX";

const useStyles = makeStyles(() => ({
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
    cursor: 'pointer',
    wordWrap: 'break-word',
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

  const classes = useStyles()
  const {city, changeCity} = useCity()
  const [inputValue, setInputValue] = useState('')
  const {id} = useAuth()
  const [stateListCity, setStateListCity] = useState([]);

  const startArrCity = [
    {name: "Москва", geo: [55.755826, 37.617300]}, {name: "Ростов-на-Дону", geo: [47.235714, 39.701505]}, {name: "Тюмень", geo: [57.155339, 65.561864]},
    {name: "Санкт-Петербург", geo: [59.931058, 30.360910]}, {name: "Уфа", geo: [54.734791, 55.957856]}, {name: "Ижевск", geo: [56.861860, 53.232428]},
    {name: "Екатеринбург", geo: [56.843099, 60.645409]}, {name: "Красноярск", geo: [56.015283, 92.893248]}, {name: "Барнаул", geo: [53.349750, 83.783574]},
    {name: "Новосибирск", geo: [54.983269, 82.896383]}, {name: "Пермь", geo: [58.009168, 56.226967]}, {name: "Ульяновск", geo: [54.318658, 48.397776]},
    {name: "Нижний Новгород", geo: [56.326868, 44.005879]}, {name: "Волгоград", geo: [48.708048, 44.513303]}, {name: "Иркутск", geo: [52.285483, 104.289022]},
    {name: "Казань", geo: [55.787894, 49.123329]}, {name: "Воронеж", geo: [51.668349, 39.191929]}, {name: "Владивосток", geo: [43.133248, 131.911297]},
    {name: "Самара", geo: [53.203772, 50.160638]}, {name: "Саратов", geo: [51.546175, 46.015412]}, {name: "Ярославль", geo: [57.626074, 39.884471]},
    {name: "Челябинск", geo: [55.164442, 61.436843]}, {name: "Краснодар", geo: [45.036035, 38.974571]}, {name: "Хабаровск", geo: [48.481443, 135.072067]},
    {name: "Омск", geo: [54.991354, 73.364520]}, {name: "Тольятти", geo:[53.508525, 49.418220]}, {name: "Оренбург", geo: [53.508525, 49.418220]}
  ]

  const handleChange = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setInputValue(value)
    axios.post(`${BASE_URL}/api/citySearch2`, {"name": value}).then(r => {
      console.log(r.data);
      setStateListCity(r.data)
    })
  }

  const onChangeCity = (name, geo) => {
    if (id) {
      axios.post('/api/userLocation', {user_id: id, data: {name: name, geo: geo}}).then(() => {
        changeCity(name)
      })
    } else {
      changeCity(name)
      localStorage.setItem('cities', JSON.stringify({city: name, geo: geo}))
    }
  }


  return (
    <div className={classes.cityContainer}>
      <div className={classes.cityTitle}>Город или регион</div>
      <div className={classes.citySearch}>
        <TextField onChange={handleChange} value={inputValue} variant="outlined" placeholder="Ваш населенный пункт, район?"
                   className={classes.cityInput}/>
        <div className={classes.cityInputIcon}>
          <Search/>
        </div>
      </div>
      <div className={classes.citySubTitle}>Или Выберите из списка</div>
      <div className={classes.cityBox}>
        {inputValue.length > 0 ?
          stateListCity.length ?
          stateListCity.map((item, i) => {

            const cityName = item.settlement
            const region = !item.unical_in_country ? `, ${item.region}` : ''
            const municipality = !item.unical_in_region ? `, ${item.municipality}` : ''
            const cityType = item.type == 'г' ? '' : `${item.type}. `
            const finalName = `${cityType}${cityName}${region}${municipality}`


            if (i <= 26) {
              return <div
                key={i + 1}
                onClick={() => {
                  onChangeCity(item.settlement, [item.latitude_dd, item.longitude_dd])
                  setDialog(!dialog)
                }}
                className={`${classes.city} ${cityName == city ? classes.cityActive : ""}`}>
                {finalName}
              </div>
            }
            return null
          }) : <h1>Ничего ненайдено</h1> :
          startArrCity.map((item, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  onChangeCity(item.name, item.geo)
                  setDialog(!dialog)
                }}
                className={`${classes.city} ${item.name == city ? classes.cityActive : ""}`}>
                {item.name}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
