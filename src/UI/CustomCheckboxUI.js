import React from 'react';
import {Checkbox} from "@material-ui/core";
import CustomCheckboxDefault from "./UIicon/CustomCheckboxDefault";
import CustomCheckboxActive from "./UIicon/CustomCheckboxActive";

const CustomCheckboxUI = ({checked}) => {

    return (
        <Checkbox
            checked={checked}
            icon={<CustomCheckboxDefault/>}
            inputProps={{ 'aria-label': 'controlled' }}
            checkedIcon={<CustomCheckboxActive/>}
        />
    );
};

export default CustomCheckboxUI;
