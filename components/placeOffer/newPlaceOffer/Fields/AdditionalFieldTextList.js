import React, {useEffect, useRef, useState} from 'react';
import {makeStyles, TextField, useMediaQuery} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import {getDataByGet} from "#lib/fetch";
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";
import {generateListArray, handlerResetsValues} from "#components/placeOffer/newPlaceOffer/AdditionalServices";
import AdditionalFieldModal from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldModal";


const useStyles = makeStyles(() => ({
    input: {
        width: "264px",
    },
}));


const AdditionalFieldTextList = ({fieldData, otherJsonObj}) => {

    const classes = useStyles();
    const {control, getValues, setValue} = useFormContext();
    const media960 = useMediaQuery('(max-width: 960px');
    // Подтянутый отдельный json
    const {otherJson, setOtherJson} = otherJsonObj

    const {
        text_list_values,
        required,
        alias,
        default_value,
        json,
        dependencies,
        title,
        type
    } = fieldData

    // Показ элемента
    const [view, setView] = useState(false);

    // Предыдущее состояние полей (зависимости - dependenciesEffect)
    const prevValues = useRef([]);

    // Зависимость для useEffect
    const dependenciesEffect = dependencies ? getValues(dependencies) : []


    // TextField - children
    const textFieldList = generateListArray(fieldData, otherJson.data, getValues);

    // Логическое вырожение для TextField defaultValue
    const isProps = textFieldList?.length > 1 ? true : false

    useEffect(() => {
        if (otherJson.data) {
            if (Array.isArray(textFieldList) && !isProps) {
                setValue(alias, textFieldList[0]?.props?.value)
            }
        }
    }, [isProps])



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
                handlerResetsValues({dependenciesEffect, dependencies}, prevValues.current, setValue)

                // Предыдущее состояние полей
                prevValues.current = dependenciesEffect

                // Показываем / скрываем элемент
                setView(dependenciesView)

                if (dependenciesView) {
                    // Чтобы не делать много запросов изменяем состояние json родителя
                    if (json && getValues(dependencies[0]) !== otherJson.name) {
                        getDataByGet(`${json}/${getValues(dependencies[0])}.json`)
                            .then(response => {
                                if (Array.isArray(response?.children)) {
                                    setOtherJson({name: getValues(dependencies[0]), data: response.children})
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


    return (
        view && (
            <AdditionalWrapper title={title} type={type}>
                {media960 ? (
                    <AdditionalFieldModal
                        title={title}
                        dataItems={textFieldList}
                        alias={alias}
                        getValues={getValues}
                        setValue={setValue}
                    />
                ) : (
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
                                // inputProps={{readOnly: readOnly}}
                                helperText={error ? error.message : ' '}>
                                {textFieldList}
                            </TextField>
                        )}
                        rules={{required: required.state ? required.value : false}}
                    />
                )}
            </AdditionalWrapper>
        )
    )
};

export default AdditionalFieldTextList;