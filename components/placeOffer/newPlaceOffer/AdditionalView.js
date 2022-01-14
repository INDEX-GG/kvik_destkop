import React, {useEffect, useState} from 'react';
import {useFormContext} from "react-hook-form";
import {generateListArray} from "#components/placeOffer/newPlaceOffer/AdditionalServices";



const AdditionalView = ({fieldData, jsonData, children}) => {

    const {getValues, setValue} = useFormContext();

    const [view, setView] = useState(false);
    const [valueObj, setValueObj] = useState({});

    const {dependencies, alias, dependenciesValues} = fieldData
    const dependenciesEffect = dependencies ? getValues(dependencies) : []


    const clearValue = (alias) => {
        if (getValues(alias)) {
            setValue(alias, '')
        }
    }

    useEffect(() => {
        // Если нет зависимостей
        if (!dependenciesEffect.length) {
            setView(true)
            return
        }

        // Отфильтрованныей массив без null
        const dependenciesFilter = dependenciesEffect.filter(item => item);
        // // Если динна отфильтрованного массива сходится с зависимостями
        const dependenciesView = dependenciesFilter.length === dependencies?.length

        if (dependenciesView) {
            // Если из json подтягивается определённое value для alias
            if (dependenciesValues) {

                for (let i = 0; i < dependenciesValues.length; i++) {
                    if (dependenciesValues[i] !== dependenciesFilter[i]) {
                        setView(false)
                        clearValue(alias)
                        return;
                    }
                }

                setView(true);

            } else {
                setView(true)
            }

        } else {
            setView(false)
            clearValue(alias)
        }


    }, [dependenciesEffect])


    useEffect(() => {
        if (view && Array.isArray(jsonData.data) && dependencies) {
            const values = generateListArray(fieldData, jsonData.data, getValues, true)

            // Проверка на объект
            if (typeof values === 'object' && !Array.isArray(values)) {
                // Изменение значения поля
                if (getValues(alias) !== values.value) {
                    setValue(alias, `${values.value}`)
                }
            } else {
                // Исключительный алиас (единичный случай)
                if (alias === 'year_of_issue') {
                    setValueObj(values)
                }
            }

        }
    }, [view, dependenciesEffect])

    console.log(valueObj)

    return (
        view && (
            <>
                {/* Проверка на исключительный alias*/}
                {alias === 'year_of_issue'
                    ? React.cloneElement(children, {yearsData: valueObj})
                    : children}
            </>
        )
    );
};

export default AdditionalView;