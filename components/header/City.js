import {makeStyles} from "@material-ui/core"
import Search from '../../UI/icons/Search';
import {useCity} from "../../lib/Context/CityCTX"
import React, {useEffect} from "react";
import {useAuth} from "../../lib/Context/AuthCTX";
import {useStore} from "../../lib/Context/Store";
import {getTokenDataByPost} from "../../lib/fetch";
import {AddressSuggestions} from "react-dadata";

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
        '& > div': {
            maxWidth: "400px",
            margin: '0 auto'
        },
        '& > div > input': {
            width: "100%",
            height: "32px",
        }
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
    },
    citySuggest: {
        display: 'block',
        fontSize: '14px',
        padding: '5px 5px 0',
        width: '100%',
        textAlign: 'left',
        backgroundColor: 'red',
    }
}))

export default function City({dialog, setDialog}) {

    const classes = useStyles()
    const {city, changeCity} = useCity()
    const {id, token} = useAuth()
    const {userInfo, setUserInfo} = useStore()


    const startArrCity = [
        {name: "Москва", geo: [55.755826, 37.617300], searchName: "RU$RU-MOW$Москва"},
        {name: "Ростов-на-Дону", geo: [47.235714, 39.701505], searchName: "RU$RU-ROS$Ростов-на-Дону"},
        {name: "Тюмень", geo: [57.155339, 65.561864], searchName: "RU$RU-TYU$Тюмень"},
        {name: "Санкт-Петербург", geo: [59.931058, 30.360910], searchName: "RU$RU-SPE$Санкт-Петербург"},
        {name: "Уфа", geo: [54.734791, 55.957856], searchName: "RU$RU-BA$Уфа"},
        {name: "Ижевск", geo: [56.861860, 53.232428], searchName: "RU$RU-UD$Ижевск"},
        {name: "Екатеринбург", geo: [56.843099, 60.645409], searchName: "RU$RU-SVE$Екатеринбург"},
        {name: "Красноярск", geo: [56.015283, 92.893248], searchName: "RU$RU-KYA$Красноярск"},
        {name: "Барнаул", geo: [53.349750, 83.783574], searchName: "RU$RU-ALT$Барнаул"},
        {name: "Новосибирск", geo: [54.983269, 82.896383], searchName: "RU$RU-NVS$Новосибирск"},
        {name: "Пермь", geo: [58.009168, 56.226967], searchName: "RU$RU-PER$Пермь"},
        {name: "Ульяновск", geo: [54.318658, 48.397776], searchName: "RU$RU-ULY$Ульяновск"},
        {name: "Нижний Новгород", geo: [56.326868, 44.005879], searchName: "RU$RU-NIZ$Нижний Новгород"},
        {name: "Волгоград", geo: [48.708048, 44.513303], searchName: "RU$RU-VGG$Волгоград"},
        {name: "Иркутск", geo: [52.285483, 104.289022], searchName: "RU$RU-IRK$Иркутск"},
        {name: "Казань", geo: [55.787894, 49.123329], searchName: "RU$RU-TA$Казань"},
        {name: "Воронеж", geo: [51.668349, 39.191929], searchName: "RU$RU-VOR$Воронеж"},
        {name: "Владивосток", geo: [43.133248, 131.911297], searchName: "RU$RU-PRI$Владивосток"},
        {name: "Самара", geo: [53.203772, 50.160638], searchName: "RU$RU-SAM$Самара"},
        {name: "Саратов", geo: [51.546175, 46.015412], searchName: "RU$RU-SAR$Саратов"},
        {name: "Ярославль", geo: [57.626074, 39.884471], searchName: "RU$RU-YAR$Ярославль"},
        {name: "Челябинск", geo: [55.164442, 61.436843], searchName: "RU$RU-CHE$Челябинск"},
        {name: "Краснодар", geo: [45.036035, 38.974571], searchName: "RU$RU-KDA$Краснодар"},
        {name: "Хабаровск", geo: [48.481443, 135.072067], searchName: "RU$RU-KHA$Хабаровск"},
        {name: "Омск", geo: [54.991354, 73.364520], searchName: "RU$RU-OMS$Омск"},
        {name: "Тольятти", geo: [53.508525, 49.418220], searchName: "RU$RU-SAM$Тольятти"},
        {name: "Оренбург", geo: [53.508525, 49.418220], searchName: "RU$RU-ORE$Оренбург"}
    ]

    // const handleChange = (e) => {
    //   const value = e.target.value.trim().toLowerCase();
    //   setInputValue(value)
    //   axios.post(`${BASE_URL}/api/citySearch2`, {"name": value}).then(r => {
    //     console.log(r.data);
    //     setStateListCity(r.data)
    //   })
    // }


    const onChangeCity = (name, geo, searchName) => {
        if (id) {
            getTokenDataByPost('/api/userLocation', {user_id: id, data: {name, geo, searchName}}, token).then(() => {
                changeCity(name)
                setUserInfo({...userInfo, location: {name: name, geo: geo, searchName}})
            })
        } else {
            changeCity(name)
            localStorage.setItem('cities', JSON.stringify({city: name, geo: geo, searchName}))
        }
    }

    useEffect(() => {
        console.log(userInfo)
    }, [userInfo])


    const handleChange = (suggestion) => {
        let fullCity = ''
        const data = suggestion.data
        const area = data.area ? `$${data.area}` : '';
        const city = data.city ? `$${data.city}` : '';
        const settlement = data.settlement ? `$${data.settlement}` : '';
        fullCity += `${data.country_iso_code}$${data.region_iso_code}${area}${city}${settlement}`
        const geo = [data.geo_lat, data.geo_lon]
        const name = suggestion.value

        getTokenDataByPost('/api/userLocation', {
            user_id: id,
            data: {name: name, geo: geo, searchName: fullCity}
        }, token)
            .then(() => {
                changeCity(name)
                setUserInfo({...userInfo, location: {name: name, geo: geo, searchName: fullCity}})
                setDialog(false);
            })

        // console.log(fullCity, suggestion)
    }


    return (
        <div className={classes.cityContainer}>
            <div className={classes.cityTitle}>Город или регион</div>
            <div className={classes.citySearch}>
                <div className={classes.searchWrapper}>
                    <AddressSuggestions
                        containerClassName={classes.cityInput}
                        token="3fa959dcd662d65fdc2ef38f43c2b699a3485222"
                        onChange={handleChange}
                        filterFromBound='city-region'
                        filterToBound='settlement'
                        count={5}
                        defaultQuery={userInfo?.location?.name}
                        minChars={2}
                        delay={5}
                    />
                </div>
                <div className={classes.cityInputIcon}>
                    <Search/>
                </div>
            </div>
            <div className={classes.citySubTitle}>Или Выберите из списка</div>
            <div className={classes.cityBox}>
                {
                    startArrCity.map((item, i) => {
                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    onChangeCity(item.name, item.geo, item.searchName)
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
