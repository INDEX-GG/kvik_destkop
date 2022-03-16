import React from 'react';

import Compare from '#components/account/Compare/Compare';
import AccountProvider from "../../../src/context/AccountContext";
import AccountPage from "../../../src/components/Account/AccountPage";

const Index = () => {
    return (
        <AccountProvider>
            <AccountPage mainContent={Compare} />
        </AccountProvider>
    );
};

export default Index;
