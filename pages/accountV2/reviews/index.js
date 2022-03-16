import React from 'react';

import Reviews from '#components/account/Reviews/Reviews';
import AccountProvider from "../../../src/context/AccountContext";
import AccountPage from "../../../src/components/Account/AccountPage";

const Index = () => {
    return (
        <AccountProvider>
            <AccountPage mainContent={Reviews}/>
        </AccountProvider>
    );
};

export default Index;
