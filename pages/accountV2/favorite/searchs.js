import React from 'react';
import AccountProvider from "../../../src/context/AccountContext";
import AccountPage from "../../../src/components/Account/AccountPage";

const Searchs = () => {
    return (
        <AccountProvider>
            <AccountPage/>
        </AccountProvider>
    );
};

export default Searchs;
