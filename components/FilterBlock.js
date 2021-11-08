import React, {useEffect, useState} from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
import DefaultFilter from "./filter/DefaultFilter";
import { FormProvider, useForm } from "react-hook-form";
import FilterMain from "./filter/FilterMain";
import FilterAuto from "./filter/FilterAuto";
import FilterVacancies from "./filter/FilterVacancies";
import FilterProduct from "./filter/FilterProduct";
import axios from "axios";
import { BASE_URL } from "../lib/constants";
import { generateDataArr} from "../lib/services";
import {useRouter} from "next/router";
import {generateCheckboxTime, generateCheckBoxObj} from "../lib/utils/checkBoxFunction";

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

const FilterBlock = ({ categoryData, searchText, pageLimit, setCheckbox, aliasFullName }) => {
  const classes = useStyles();
  const category = categoryData?.aliasName[0].alias.toLowerCase();
  const servicesCategory = categoryData?.aliasBread[0].alias
  const methods = useForm();
  const [fetchedData, setFetchedData] = useState(null)
  const [services, setServices] = useState(false);
  const router = useRouter()
  let filter;



  const clearFields = () => {
    methods.reset();
    setCheckbox(undefined)
    router.push({
      pathname: router.pathname,
      query: {
        alias: router.query.alias
      }
    })
  };

  useEffect(() => {
    setCheckbox(undefined)
  }, [router])


  useEffect(() => {
    if (searchText && category) {
      clearFields()
    }
  }, [searchText, category])

  useEffect(() => {
    servicesCategory === "services" ? setServices(true) : setServices(false)
  }, [servicesCategory]);

  useEffect(() => {
    if (category){
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
      filter = <FilterMain data={fetchedData?.[category]} />;
      break;
    case "vacancies":
    case "summary":
      filter = <FilterVacancies data={fetchedData?.[category]} />;
      break;
    case "auto":
      filter = <FilterAuto />;
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
      filter = <FilterProduct data={fetchedData?.[category]} />;
      break;
    default:
      filter = <DefaultFilter services={services}/>;
  }


  const onSubmit = (data) => {


    if (window) {
      window.scrollTo(0, 0)
    }

    const routeObj = {}

    generateCheckBoxObj(data, routeObj);

    const sendCheckObj = {
      price: data.price,
      category: categoryData?.aliasName[0]?.alias,
      categoryFullName: aliasFullName,
      text: searchText ? searchText : "",
      time: generateCheckboxTime(data.period),
      page: 1,
      page_limit: pageLimit,
      check: {}
    }


    if (data.color?.length) {
      data.color = data.color.map(item => item + 1)
    }

    delete data.price
    delete data?.period

    sendCheckObj.check = data


    console.log(routeObj)

    axios.post('/api/getPostsCheck', sendCheckObj)
      .then(r => {
        console.log(r)
      setCheckbox(generateDataArr(r.data));
      })
      .catch((e) => {
        console.log(e)
      })

    router.push({
      pathname: `${router.pathname}`,
      query: {
        alias: router.query.alias,
        ...routeObj
      }
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
          {methods.formState.isDirty && (
            <Button
              className={`${classes.button} ${classes.buttonClear}`}
              onClick={clearFields}
              color="default"
              variant="contained"
            >
              Очистить фильтр
            </Button>
          )}
        </Box>
      </form>
    </FormProvider>
  );
};

export default FilterBlock;
