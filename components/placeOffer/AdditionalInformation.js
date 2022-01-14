import AdditionalFields from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFields";
import {useState} from "react";


const AdditionalInformation = ({currentCategory, filters = null}) => {


    const allAdditionalFields = currentCategory.additional_fields;
    const [otherJson, setOtherJson] = useState([{name: '', data: []}]);


    return (
        allAdditionalFields.map(currentField => (
            <AdditionalFields
                key={currentField.alias}
                fieldData={currentField}
                otherJsonObj={{otherJson, setOtherJson}}
                filters={filters}
            />
        ))
    );
}
export default AdditionalInformation
