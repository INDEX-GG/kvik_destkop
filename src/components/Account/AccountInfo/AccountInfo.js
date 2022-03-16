import React from "react";
import {useAccountInfoStyles} from './style';
import AccountUser from "./AccountUser/AccountUser";
import AccountTab from "./AccountTab/AccountTab";
import {Box} from "@mui/material";

const AccountInfo = () => {

    const classes = useAccountInfoStyles()

    return (
        <Box className={classes.userInfoContainer}>
            <AccountUser/>
            <AccountTab/>
        </Box>
    )
}

export default React.memo(AccountInfo);
