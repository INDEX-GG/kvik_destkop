import useCategoryV2 from "#hooks/useCategoryV2";
import {useProductContext} from "../../../../context/ProductContext";
import {useMemo} from "react";
import {checkTypeOf} from "../../../../services/services";

export const useProductAdditionalFields = () => {

    const {getMoreCategory} = useCategoryV2();
    const {productData: {additional_fields, category_id, description}} = useProductContext();

    // Получаем массив алиасов
    const categoryAliasArr = useMemo(() => {
        if (checkTypeOf(category_id, 'string')) {
            return category_id.split(',')
        }
    }, [category_id])


    // Получаем обный объект этой категории из json
    const jsonData = useMemo(() => {
        if (checkTypeOf(categoryAliasArr, 'object')) {
            return getMoreCategory(
                categoryAliasArr[0],
                categoryAliasArr[1],
                categoryAliasArr[2]
            )?.additional_fields
        }
    }, [categoryAliasArr]);

    // Создание правильного объекта для доп.полей (airbags1, airbags2 и т.д) ({title: string, value: any})
    const russDataObj = useMemo(() => {
        if (checkTypeOf(jsonData, 'object')) {
            // generateNormalObjeсt - функция внизу документа
            const additionalRusNamesObj = generateNormalObject(jsonData, additional_fields);
            // Если value пустое, то удаляем
            if (Array.isArray(additionalRusNamesObj)) {
                return additionalRusNamesObj.filter(item => item.value)
            }
        }
    }, [jsonData])

    const excludeArrayInRusDataObj = useMemo(() => {
        if (Array.isArray(russDataObj)) {
            return {
                noArrayValue: checkArrayInData(russDataObj, false),
                onlyArrValue: checkArrayInData(russDataObj, true),
            }
        }
    }, [russDataObj])

    return {
        description,
        russAdditionalFields: excludeArrayInRusDataObj
    }
}

const checkArrayInData = (data, arrayInData) => {
    return (
        data.filter(item => {
            if (arrayInData) {
                const length = item.value?.length
                return Array.isArray(item.value) && length
            }
            return !Array.isArray(item.value)
        })
    )
}

// Формируем объект с русским названием (title) и любым значением (value)
const generateNormalObject = (jsonData, additional_fields) => {
    const rusAdditionalObj = jsonData.map(item => {
        // Если мы не хотим показывать пользователю поле
        if (item?.view_product === false) {
            return {}
        }
        // Если ключ в объекте с цифрой (только у 'check_list')
        if (item.type == 'check_list') {

            const checkListTrueData = []
            const checkListData = item?.check_list_values

            if (Array.isArray(checkListData)) {
                checkListData.map((checkValue, index) => {
                    // Проверка на true (c бека прилетает ~ {airbages1: false, airbage2: true})
                    if (additional_fields[item.alias + (index + 1)]) {
                        checkListTrueData.push(checkValue)
                    }
                })
            }
            return {title: item.title, value: checkListTrueData}
        }

        // Если цвет
        if (item.alias == 'color') {
            return {title: item.title, value: item.text_list_values[+additional_fields[item.alias]].name}
        }

        return {title: item.title, value: additional_fields[item.alias]}
    })

    return rusAdditionalObj;
}
