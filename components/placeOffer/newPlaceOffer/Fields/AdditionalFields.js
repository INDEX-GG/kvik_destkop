import React from 'react';
import AdditionalFieldText from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldText";
import AdditionalFieldNumber from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldNumber";
import AdditionalFieldBoolean from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldBoolean";
import AdditionalFieldCheckList from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldCheckList";
import AdditionalFieldTextList from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldTextList";
import AdditionalFieldColor from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldColor";
import AdditionalView from "#components/placeOffer/newPlaceOffer/AdditionalView";
import AdditionalFieldPeriod from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldPeriod";
import AdditionalFieldTextListData from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldTextListData";
import AdditionalFieldTextListJson from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldTextListJson";
import FilterTwoFields from "#components/filter/FilterTwoFields";
import AdditionalFieldMaxMin from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldMaxMin";
import FilterMultipleSelect from "#components/filter/FilterMultipleSelect";
import FilterColor from "#components/filter/FilterColor";


const generateFields = (fieldData, otherJsonObj, filters) => {

    const {text_list_rendering_type, filter_render_type, filter_view, text_list_filter_type, alias} = fieldData;
    const {otherJson} = otherJsonObj
    let View = AdditionalView;


    //? Если на странице с фильтрами
    if (filters) {
        //? Делаем все поля не обязательными
        fieldData.required = {...fieldData.required, state: false}


        if (filter_view === false) {
            return  null
        } else {
            //? Меняем wrapper чтобы сразу показать элемент (не учитывая поле dependencies)
            View = ({children}) => <>{children}</>
        }
    }

    // Если находимся в фильтрах и у фильтров есть свой тип
    const type = filters ? fieldData?.filter_type ? fieldData?.filter_type : fieldData.type : fieldData.type
    const title = filters ? fieldData?.filter_title ? fieldData?.filter_title : fieldData.title : fieldData.title

    //* В зависимости от типа, формируем UI
    switch (type) {
        case 'text':
            return (
                <View fieldData={fieldData} jsonData={otherJson}>
                    <AdditionalFieldText
                        fieldData={fieldData}
                        otherJsonObj={otherJsonObj}
                    />
                </View>
            )
        case 'text_list':

            // Фильтры
            if (filters) {
                if (text_list_filter_type === 1) {
                    return (
                        <AdditionalFieldTextListJson
                            fieldObj={fieldData}
                            filters={filters}
                        />
                    )
                }
                if (text_list_filter_type === 2) {
                    return (
                        <AdditionalFieldMaxMin
                            fieldObj={fieldData}
                        />
                    )
                }
                if (text_list_filter_type === 3) {
                    return (
                        Array.isArray(fieldData?.default_filter_arr) && (
                            <FilterMultipleSelect data={fieldData}/>
                        )
                    )
                }
            }


            // Цвет
            if (text_list_rendering_type === 1) {

                if (filters) {
                    return (
                        <FilterColor alias='color' title='Цвет'/>
                    )
                }

                return (
                    <View fieldData={fieldData} jsonData={otherJson}>
                        <AdditionalFieldColor
                            fieldData={fieldData}
                            otherJsonObj={otherJsonObj}
                        />
                    </View>
                )
            } else {
                return (
                    <AdditionalFieldTextList
                        fieldData={fieldData}
                        otherJsonObj={otherJsonObj}
                        otherTitle={title}
                    />
                )
            }
        case 'number':
            return (
                <View fieldData={fieldData} jsonData={otherJson}>
                    <AdditionalFieldNumber
                        fieldData={fieldData}
                        otherJsonObj={otherJsonObj}
                    />
                </View>
            )
        case 'boolean':
            return (
                <View fieldData={fieldData} jsonData={otherJson}>
                    <AdditionalFieldBoolean
                        fieldData={fieldData}
                        otherJsonObj={otherJsonObj}
                    />
                </View>
            )
        case 'check_list':
            return (
                <View fieldData={fieldData} jsonData={otherJson}>
                    <AdditionalFieldCheckList
                        fieldData={fieldData}
                        otherJsonObj={otherJsonObj}
                    />
                </View>
            )
        case 'period':

            if (filters && filter_render_type === 2) {
                return  (
                    <FilterTwoFields
                        data={{firstAlias: `from$${alias}`, secondAlias: `to$${alias}`, title: title}}
                    />
                )
            }

            return (
                <View fieldData={fieldData} jsonData={otherJson}>
                    <AdditionalFieldPeriod
                        jsonData={otherJson}
                        fieldData={fieldData}
                    />
                </View>
            )

        case 'text_list_time':
            return (
                <View fieldData={fieldData} jsonData={otherJson}>
                    <AdditionalFieldTextListData
                        fieldData={fieldData}/>
                </View>
            )
    }
}


const AdditionalFields = ({fieldData, otherJsonObj, filters}) => {
    //? Функция, которая генерирует UI дополнильного поля от type и render_type
    return (
        generateFields(fieldData, otherJsonObj, filters)
    );
};

export default AdditionalFields;