import {Box} from "@mui/material";
import React from 'react';

import MetaLayout from "#layout/MetaLayout";
import KvikContainer from "../AnyPage/KvikContainer/KvikContainer";
import {useAccountContext} from "../../context/AccountContext";
import AccountInfo from "./AccountInfo/AccountInfo";
import AccountTab from './AccountTab/AccountTab'

import {useAccountPageStyles} from "./style";

/**
 *
 */
const AccountPage = ({title = 'Личный кабинет', tabs, children }) => {

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
                        <Box className={classes.mainContainer} style={{display: 'flex', flexDirection: 'column'}}>
                            {tabs && <AccountTab tabs={tabs} />}
                            {children}
                        </Box>
                    </Box>
                ) : null}
            </KvikContainer>
        </MetaLayout>
    );
};

export default React.memo(AccountPage);
