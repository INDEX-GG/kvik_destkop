import React from 'react';
import MetaLayout from "#layout/MetaLayout";
import KvikContainer from "../AnyPage/KvikContainer/KvikContainer";
import {useAccountContext} from "../../context/AccountContext";
import AccountInfo from "./AccountInfo/AccountInfo";
import {Box} from "@mui/material";
import {useAccountPageStyles} from "./style";

const AccountPage = ({title = 'Личный кабинет' }) => {

    const classes = useAccountPageStyles();

    const {
        isLoading
    } = useAccountContext();

    return (
        <MetaLayout title={title}>
            <KvikContainer>
                {!isLoading ? (
                    <Box className={classes.accountContainer}>
                        <AccountInfo/>
                        {/*<AccountTab/>*/}
                    </Box>
                ) : null}
            </KvikContainer>
        </MetaLayout>
    );
};

export default React.memo(AccountPage);
