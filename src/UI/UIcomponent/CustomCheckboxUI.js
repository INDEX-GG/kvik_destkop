import React from 'react';
import {Checkbox} from "@material-ui/core";
import CustomCheckboxDefault from "../UIicon/CustomCheckboxDefault";
import CustomCheckboxActive from "../UIicon/CustomCheckboxActive";

const CustomCheckboxUI = ({checked, onChange = () => null}) => {

    return (
        <Checkbox
            checked={checked}
            onChange={onChange}
            icon={<CustomCheckboxDefault/>}
            inputProps={{ 'aria-label': 'controlled' }}
            checkedIcon={<CustomCheckboxActive/>}
        />
    );
};

export default React.memo(CustomCheckboxUI);
