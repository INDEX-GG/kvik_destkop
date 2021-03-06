import React, {useEffect, useRef, useState} from "react";
import {Box, Button, makeStyles} from "@material-ui/core";
import DefaultFilter from "./filter/DefaultFilter";
import {FormProvider, useForm} from "react-hook-form";
import FilterMain from "./filter/FilterMain";
import FilterAuto from "./filter/FilterAuto";
import FilterVacancies from "./filter/FilterVacancies";
import FilterProduct from "./filter/FilterProduct";
import axios from "axios";
import {BASE_URL} from "../lib/constants";
// import {generateDataArr} from "../lib/services";
import {useRouter} from "next/router";
import {generateCheckboxTime, generateCheckBoxObj, formDefaultValue} from "../lib/utils/checkBoxFunction";

const useStyles = makeStyles(() => ({
    root: {
        marginTop: "29px",
        minWidth: "224px",
        borderRadius: 8,
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    },
    button: {
        margin: "0 8px 8px 8px",
        "&:disabled": {
            color: "#fff",
            backgroundColor: "#A1DCE0",
        },
    },
    buttonsField: {
        display: "flex",
        flexDirection: "column",
    },
    buttonClear: {
        marginTop: 24,
    },
}));

// pageLimit
const FilterBlock = ({categoryData, searchText, setCheckbox, aliasFullName}) => {
    const classes = useStyles();
    const category = categoryData?.aliasName[0].alias.toLowerCase();
    const servicesCategory = categoryData?.aliasBread[0].alias
    const [fetchedData, setFetchedData] = useState(null)
    const [services, setServices] = useState(false);
    const pageRender = useRef(0);
    const router = useRouter()
    const methods = useForm();
    let filter;


    useEffect(async () => {
        // Изменение изначальных значений формы (defaultValue)
        if (Object.keys(router.query).length) {
            await formDefaultValue(router.query, methods)
        }
    }, [router, methods.getValues, searchText])

    // Количество рендеров страницы
    useEffect(() => {
        if (category) pageRender.current += 1
    }, [category, searchText])


    // Очистка всех полей и query у router
    const clearFields = () => {
        methods.reset({});
        setCheckbox(undefined)
        router.push({
            pathname: router.pathname,
            query: {
                alias: router.query.alias
            }
        })
    };


    // ! ВОЗМОЖНЫ БАГИ
    // ! Происходит очистка полей, когда обновляется category (auto, transport, animal) или когда пользователь что-то ищет через поиск
    useEffect(() => {
        console.log(category, searchText, pageRender)
        if (searchText) {
            setCheckbox(undefined)
            return
        }

        if (category && pageRender.current > 1) {
            methods.reset({});
            setCheckbox(undefined)
        }
    }, [category, searchText])


    useEffect(() => {
        servicesCategory === "services" ? setServices(true) : setServices(false)
    }, [servicesCategory]);

    useEffect(() => {
        if (category) {
            axios.get(`${BASE_URL}/filters/` + category + `.json`)
                .then(res => setFetchedData(res.data))
                .catch(e => e)
        }
    }, [category])


    switch (category) {
        case "new_building":
        case "secondary_housing":
        case "sell_commercial_premises":
        case "sell_office_space":
        case "rent_apartments":
        case "sell_free_premises":
        case "sell_building":
        case "rent_free_premises":
        case "rent_building":
        case "sell_houses_and_cottages":
        case "rent_houses_and_cottages":
        case "sell_rooms":
        case "rent_rooms":
        case "sell_izhs":
        case "sell_snt":
        case "sell_agriculturalland":
        case "sell_commercialland":
        case "sell_garage":
        case "rent_garage":
        case "sell_parkingplace":
        case "rent_parkingplace":
        case "sell_abroad":
        case "rent_abroad":
        case "cats":
        case "dogs":
        case "sell_warehouse_space":
        case "rent_warehouse_space":
        case "rent_production_room":
        case "sell_production_room":
        case "rent_office_space":
        case "rent_commercial_premises":
            filter = <FilterMain data={fetchedData?.[category]}/>;
            break;
        case "vacancies":
        case "summary":
            filter = <FilterVacancies data={fetchedData?.[category]}/>;
            break;
        case "auto":
            filter = <FilterAuto/>;
            break;
        case "for_home":
        case "for_personalized_care":
        case "for_kitchen":
        case "climatic_equipment":
        case "monitors":
        case "manipulators__input_devices":
        case "expendable_materials":
        case "ram":
        case "data_storage":
        case "housings_corp":
        case "video_cards_componentsss":
        case "other_comp":
        case "personal_computer_accessories":
        case "ram_for_servers":
        case "server_network_hardware":
        case "steering_wheels_gamepads_joysticks":
        case "printers":
        case "mfps_and_scanners":
        case "consumables_for_office_equipment":
        case "ups_and_surge_protectors":
        case "tv_sets_cat2":
        case "hi_fi_technology":
        case "tv_accessories":
        case "audio_engineering":
        case "video_engineering":
        case "chargers_power_supplies":
        case "smart_watches_and_fitness_bracelets":
        case "electronic_books":
        case "tablets":
        case "motherboards_perif":
        case "laptops":
        case "smartphones":
        case "telephones":
        case "bicycles":
            filter = <FilterProduct data={fetchedData?.[category]}/>;
            break;
        default:
            filter = <DefaultFilter services={services}/>;
    }


    // Проверяем есть ли в query данные для форм. Если есть, то показываем кнопку
    const changeDisableButton = () => {
        const copyQuery = Object.assign({}, router.query)

        if (copyQuery?.alias) delete copyQuery.alias
        if (copyQuery?.text) delete copyQuery.text

        return Object.keys(copyQuery).length
    }


    // Событие отправки формы
    const onSubmit = (data) => {
        // Скролл в начало
        if (window) {
            window.scrollTo(0, 0)
        }

        const routeObj = {}

        // создание правильного объекта чекбоксов для запроса
        generateCheckBoxObj(data, routeObj);

        const sendCheckObj = {
            price: data.price,
            category: categoryData?.aliasName[0]?.alias,
            categoryFullName: aliasFullName,
            text: searchText ? "" : "",
            time: generateCheckboxTime(data.period),
            // page: 1,
            // page_limit: pageLimit,
            check: {}
        }


        delete data.price
        delete data?.period

        sendCheckObj.check = data

        // Мапим цвета, из-за разности value
        if (sendCheckObj.check?.color?.length) {
            sendCheckObj.check.color = sendCheckObj.check?.color.map(item => {
                return +item + 1
            })
        }

        delete sendCheckObj.check?.alias
        delete sendCheckObj.check?.text
        delete routeObj?.text



        setCheckbox(sendCheckObj);

        // axios.post('/api/getPostsCheck', sendCheckObj)
        //     .then(r => {
        //         console.log(r)
        //         setCheckbox(generateDataArr(r.data));
        //     })
        //     .catch((e) => {
        //         console.log(e)
        //     })


        const pushObj = {
            alias: router.query.alias,
            ...routeObj
        }

        if (router?.query?.text) {
            pushObj.text = router.query.text
        }

        router.push({
            pathname: `${router.pathname}`,
            query: pushObj
        })
    };

    return (
        <FormProvider {...methods}>
            <form className={classes.root} onSubmit={methods.handleSubmit(onSubmit)}>
                {filter}
                <Box className={classes.buttonsField}>
                    <Button
                        className={classes.button}
                        disabled={!methods.formState.isDirty}
                        type="submit"
                        color="primary"
                        variant="contained"
                    >
                        Показать объявления
                    </Button>
                    {methods.formState.isDirty || changeDisableButton() ? (
                        <Button
                            className={`${classes.button} ${classes.buttonClear}`}
                            onClick={clearFields}
                            color="default"
                            variant="contained"
                        >
                            Очистить фильтр
                        </Button>
                    ) : null}
                </Box>
            </form>
        </FormProvider>
    );
};

export default FilterBlock;
