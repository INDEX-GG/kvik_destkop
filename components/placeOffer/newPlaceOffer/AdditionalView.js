import React, {useEffect, useState} from 'react';
import {useFormContext} from "react-hook-form";
import {generateListArray} from "#components/placeOffer/newPlaceOffer/AdditionalServices";



const AdditionalView = ({fieldData, jsonData, children}) => {

    const {getValues, setValue} = useFormContext();

    const [view, setView] = useState(false);

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
                setValue(alias, values.value)
            }

        }
    }, [view])

    return (
        view && (
            <>
                {children}
            </>
        )
    );
};

export default AdditionalView;