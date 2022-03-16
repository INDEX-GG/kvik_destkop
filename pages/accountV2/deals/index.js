import React from 'react';
import AccountProvider from "../../../src/context/AccountContext";
import AccountPage from "../../../src/components/Account/AccountPage";
import Deals from '#components/account/Deals/Deals';

const Index = () => {
    return (
        <AccountProvider>
            <AccountPage mainContent={Deals}/>
        </AccountProvider>
    );
};

export default Index;
