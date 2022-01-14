import AdditionalView from "#components/placeOffer/newPlaceOffer/AdditionalView";
import AdditionalFieldText from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldText";
import AdditionalFieldColor from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldColor";
import AdditionalFieldTextList from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldTextList";
import AdditionalFieldNumber from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldNumber";
import AdditionalFieldBoolean from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldBoolean";
import AdditionalFieldCheckList from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldCheckList";
import AdditionalFieldPeriod from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldPeriod";
import AdditionalFieldTextListData from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldTextListData";
import React from "react";

export const generateFields = (fieldData, otherJsonObj) => {

    const {text_list_rendering_type} = fieldData;
    const {otherJson} = otherJsonObj

    switch (fieldData.type) {
        case 'text':
            return (
                <AdditionalView fieldData={fieldData} jsonData={otherJson}>
                    <AdditionalFieldText
                        fieldData={fieldData}
                        otherJsonObj={otherJsonObj}
                    />
                </AdditionalView>
            )
        case 'text_list':
            // Цвет
            if (text_list_rendering_type === 1) {
                return (
                    <AdditionalView fieldData={fieldData} jsonData={otherJson}>
                        <AdditionalFieldColor
                            fieldData={fieldData}
                            otherJsonObj={otherJsonObj}
                        />
                    </AdditionalView>
                )
            } else {
                return (
                    <AdditionalFieldTextList
                        fieldData={fieldData}
                        otherJsonObj={otherJsonObj}
                    />
                )
            }
        case 'number':
            return (
                <AdditionalView fieldData={fieldData} jsonData={otherJson}>
                    <AdditionalFieldNumber
                        fieldData={fieldData}
                        otherJsonObj={otherJsonObj}
                    />
                </AdditionalView>
            )
        case 'boolean':
            return (
                <AdditionalView fieldData={fieldData} jsonData={otherJson}>
                    <AdditionalFieldBoolean
                        fieldData={fieldData}
                        otherJsonObj={otherJsonObj}
                    />
                </AdditionalView>
            )
        case 'check_list':
            return (
                <AdditionalView fieldData={fieldData} jsonData={otherJson}>
                    <AdditionalFieldCheckList
                        fieldData={fieldData}
                        otherJsonObj={otherJsonObj}
                    />
                </AdditionalView>
            )
        case 'period':
            return (
                <AdditionalView fieldData={fieldData} jsonData={otherJson}>
                    <AdditionalFieldPeriod
                        jsonData={otherJson}
                        fieldData={fieldData}
                    />
                </AdditionalView>
            )
        case 'text_list_time':
            return (
                <AdditionalView fieldData={fieldData} jsonData={otherJson}>
                    <AdditionalFieldTextListData
                        fieldData={fieldData}/>
                </AdditionalView>
            )
    }
}