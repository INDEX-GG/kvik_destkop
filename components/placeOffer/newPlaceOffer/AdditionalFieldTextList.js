import React, {useEffect, useRef, useState} from 'react';
import {makeStyles, MenuItem, TextField} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import {getDataByGet} from "#lib/fetch";
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";


const useStyles = makeStyles(() => ({
    input: {
        width: "264px",
    },
}));


const searchItemInArray = (array, searchItem, objectKey) => {
   return  array.find(item => item[objectKey] === searchItem)
}


const generateOtherMenu = (array) => {
    if (Array.isArray(array)) {
        return (
            array.map((itemList, i) => (
                <MenuItem key={itemList.value + i} value={itemList.value}>
                    {itemList.value}
                </MenuItem>
            ))
        )
    }
}

const generateListArray = (fieldData, jsonValue, getValues) => {

    const {text_list_values, alias, dependencies} = fieldData

    // Берём данные из другого json
    if (jsonValue.length) {

        // Изщем alias в json
        const searchJson = searchItemInArray(jsonValue, alias, 'alias')

        // Если не находим alias, то заходим во 2 вложенность (children)
        if (searchJson === undefined) {
            const searchJsonTwo = searchItemInArray(jsonValue, getValues(dependencies[1]), 'value').children

            // Третья вложенность
            if (dependencies.length === 3) {
                const searchJsonThree = searchItemInArray(searchJsonTwo, getValues(dependencies[2]), 'value').children

                // Четвёртая вложенность
                if (dependencies.length === 4) {
                    const searchJsonFour = searchItemInArray(searchJsonTwo, getValues(dependencies[3]), 'value').children

                    return generateOtherMenu(searchJsonFour)
                }

                return generateOtherMenu(searchJsonThree)
            }

            return generateOtherMenu(searchJsonTwo)
        }


        return generateOtherMenu(jsonValue)

    } else {
        // Берём данные из главного json
        return (
            text_list_values.map((itemList, i) => (
                <MenuItem key={itemList + i} value={itemList}>
                    {itemList}
                </MenuItem>
            ))
        )
    }
}



const AdditionalFieldTextList = ({fieldData}) => {

    const classes = useStyles();
    const {control, getValues, setValue} = useFormContext();


    // Подтянутый отдельный json
    const [jsonValue, setJsonValue] = useState([]);
    // Показ элемента
    const [view, setView] = useState(false);
    // Предыдущее value полей с зависимостями
    const prevValues = useRef([]);

    const {text_list_values, required, alias, default_value, json, dependencies, title, type} = fieldData
    // Зависимость для useEffect
    const dependenciesEffect = dependencies ? getValues(dependencies) : []



    const handlerResetsValues = () =>  {
        // Длеаем цикл на количество элементов
        for (let i = 0; i < dependenciesEffect.length; i++) {
            // Если текущий элемент не равен предыдущему, то очищаем поля
            if (dependenciesEffect[i] !== prevValues.current[i] && dependenciesEffect[i] && prevValues.current[i]) {
                if (dependencies[i]) {
                    setValue(dependencies[i + 1], '');
                }
            }
        }
    }

    // Следим за зависимостями
    useEffect(() => {
        // Подгрузка из другого json
        if (!text_list_values?.length) {
            // Проверка на зависимости
            if (dependencies?.length)  {
                // Отфильтрованныей массив без null
                const dependenciesFilter = dependenciesEffect.filter(item => item);
                // Если динна отфильтрованного массива сходится с зависимостями
                const dependenciesView = dependenciesFilter.length === dependencies?.length

                // Очистка (если нужна)
                handlerResetsValues()

                // Предыдущее состояние полей
                prevValues.current = dependenciesEffect

                // Показываем / скрываем элемент
                setView(dependenciesView)

                if (dependenciesView) {
                    if (json) {
                        getDataByGet(`${json}/${getValues(dependencies[0])}.json`)
                            .then(response => {
                                if (Array.isArray(response?.children)) {
                                    setJsonValue(response.children)
                                }
                            })
                    }
                }

            } else {
                setView(true)
            }
        } else {
            setView(true)
        }
    }, [...dependenciesEffect])

    if (dependencies) {
        console.log(dependenciesEffect);
    }

    return (
        view && (
            <AdditionalWrapper title={title} type={type}>
                <Controller
                    name={alias}
                    control={control}
                    defaultValue={default_value}
                    render={({field: {onChange, value}, fieldState: {error}}) => (
                        <TextField
                            select
                            className={classes.input}
                            variant='outlined'
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : ' '}>
                            {generateListArray(fieldData, jsonValue, getValues)}
                        </TextField>
                    )}
                    rules={{required: required.state ? required.value : false}}
                />
            </AdditionalWrapper>
        )
    )
};

export default AdditionalFieldTextList;