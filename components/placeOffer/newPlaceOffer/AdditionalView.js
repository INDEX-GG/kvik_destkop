import React, {useEffect, useState} from 'react';
import {useFormContext} from "react-hook-form";
import {generateListArray} from "#components/placeOffer/newPlaceOffer/AdditionalServices";



const AdditionalView = ({fieldData, jsonData, children}) => {

    const {getValues, setValue} = useFormContext();

    const [view, setView] = useState(false);
    const [valueObj, setValueObj] = useState({});

    const {dependencies, alias} = fieldData
    const dependenciesEffect = dependencies ? getValues(dependencies) : []


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
            setView(true)
        } else {
            setView(false)
        }


    }, [dependenciesEffect])


    useEffect(() => {
        if (view && Array.isArray(jsonData.data) && dependencies) {
            const values = generateListArray(fieldData, jsonData.data, getValues, true)

            // Проверка на объект
            if (typeof values === 'object' && !Array.isArray(values)) {
                // Изменение значения поля
                setValue(alias, `${values.value}`)
            }

            // Исключительный алиас (единичный случай)
            if (alias === 'year_of_issue') {
                setValueObj(values)
            }

        }
    }, [view])


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