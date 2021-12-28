import {MenuItem} from "@material-ui/core";
import React from "react";

const searchItemInArray = (array, searchItem, objectKey) => {
    if (Array.isArray(array)) {
        return  array.find(item => item[objectKey] === searchItem)
    }
}


export const generateOtherMenu = (array) => {
    if (Array.isArray(array)) {

        return (
            array.map((itemList, i) => {

                // Если массив значений
                if (!itemList?.value) {
                    return (
                        <MenuItem key={itemList + i} value={itemList}>
                            {itemList}
                        </MenuItem>
                    )
                }

                // Если массив объектов
                return (
                    <MenuItem key={itemList.value + i} value={itemList.value}>
                        {itemList.value}
                    </MenuItem>
                )
            })
        )
    }
}


export const generateListArray = (fieldData, jsonValue, getValues, onlyData = false) => {

    const {text_list_values, alias, dependencies} = fieldData

    //onlyData (true / false)  - Возвращает только дату, не jsx

    // Берём данные из другого json
    if (jsonValue?.length && dependencies?.length) {

        // Изщем alias в json
        const searchJson = searchItemInArray(jsonValue, alias, 'alias')


        // Если не находим alias, то заходим во 2 вложенность (children)
        if (searchJson === undefined) {
            const searchJsonTwo = searchItemInArray(jsonValue, getValues(dependencies[1]), 'value')

            // Третья вложенность
            if (dependencies.length >= 3 || searchJsonTwo === undefined) {
                const searchJsonThree = searchItemInArray(searchJsonTwo?.children, getValues(dependencies[2]), 'value')


                // Четвёртая вложенность
                if (dependencies.length >= 4) {
                    const searchJsonFour = searchItemInArray(searchJsonThree?.children, getValues(dependencies[3]), 'value')?.children

                    if (Array.isArray(searchJsonFour)) {
                        const searchJsonFourValue = searchItemInArray(searchJsonFour, alias, 'alias')

                        if (searchJsonFourValue?.value) {

                            if (Array.isArray(searchJsonFourValue?.value)) {

                                if (onlyData) return searchJsonFourValue
                                return generateOtherMenu(searchJsonFourValue?.value)

                            } else {

                                if (onlyData) return searchJsonFourValue
                                return generateOtherMenu([searchJsonFourValue?.value])
                            }
                        }
                    }

                }

                if (onlyData) return searchJsonThree?.children
                return generateOtherMenu(searchJsonThree?.children)
            }

            if (onlyData) return searchJsonTwo?.children
            return generateOtherMenu(searchJsonTwo?.children)
        }

        if (onlyData) return jsonValue?.children
        return generateOtherMenu(jsonValue)

    } else {

        if (text_list_values) {
            return generateOtherMenu(text_list_values)

        }
    }
}


export const handlerResetsValues = (dependenciesObj, prevValues, setValue) =>  {

    const {dependenciesEffect, dependencies} = dependenciesObj

    // Длеаем цикл на количество элементов
    for (let i = 0; i < dependenciesEffect.length; i++) {

        if (dependenciesEffect[i] && prevValues[i]) {
            // Если текущий элемент не равен предыдущему, то очищаем поля
            if (dependenciesEffect[i] !== prevValues[i]) {

                if (dependencies[i]) {
                    for (let j = i + 1; j <= dependencies.length; j++) {
                        try {
                            setValue(dependencies[j], '');
                        } catch (e) {
                            console.log(1);
                        }
                    }
                }
            }
        }
    }
}

export const setDefaultValue = (defaultValue, alias, setValue) => {
    if (defaultValue && alias) {
        setValue(alias, defaultValue);
    }
}


