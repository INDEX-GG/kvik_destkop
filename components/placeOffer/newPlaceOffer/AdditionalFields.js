import React from 'react';
import AdditionalFieldText from "#components/placeOffer/newPlaceOffer/AdditionalFieldText";
import AdditionalFieldNumber from "#components/placeOffer/newPlaceOffer/AdditionalFieldNumber";
import AdditionalFieldBoolean from "#components/placeOffer/newPlaceOffer/AdditionalFieldBoolean";
import AdditionalFieldCheckList from "#components/placeOffer/newPlaceOffer/AdditionalFieldCheckList";
import AdditionalFieldTextList from "#components/placeOffer/newPlaceOffer/AdditionalFieldTextList";
import AdditionalFieldColor from "#components/placeOffer/newPlaceOffer/AdditionalFieldColor";


const generateFields = (fieldData) => {

    const {text_list_rendering_type} = fieldData;

    switch (fieldData.type) {
        case 'text':
            return (
                <AdditionalFieldText
                    fieldData={fieldData}
                />
            )
        case 'text_list':
            // Цвет
            if (text_list_rendering_type == 1) {
                return (
                    <AdditionalFieldColor
                        fieldData={fieldData}
                    />
                )
            } else {
                return (
                    <AdditionalFieldTextList
                        fieldData={fieldData}
                    />
                )
            }
        case 'number':
            return (
                <AdditionalFieldNumber
                    fieldData={fieldData}
                />
            )
        case 'boolean':
            return (
                <AdditionalFieldBoolean
                    fieldData={fieldData}
                />
            )
        case 'check_list':
            return (
                <AdditionalFieldCheckList
                    fieldData={fieldData}
                />
            )
    }
}


const AdditionalFields = ({fieldData}) => {

    return (
        generateFields(fieldData)
    );
};

export default AdditionalFields;