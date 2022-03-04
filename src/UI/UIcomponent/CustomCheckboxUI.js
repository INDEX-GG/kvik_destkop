import React from 'react';
import {Checkbox} from "@material-ui/core";
import CustomCheckboxDefaultIcon from "../UIicon/CustomCheckboxDefaultIcon";
import CustomCheckboxActiveIcon from "../UIicon/CustomCheckboxActiveIcon";

const CustomCheckboxUI = ({checked, onChange = () => null}) => {

    return (
        <Checkbox
            checked={checked}
            onChange={onChange}
            icon={<CustomCheckboxDefaultIcon/>}
            inputProps={{ 'aria-label': 'controlled' }}
            checkedIcon={<CustomCheckboxActiveIcon/>}
        />
    );
};

export default React.memo(CustomCheckboxUI);
