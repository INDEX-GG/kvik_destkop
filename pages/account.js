import React from 'react';
import AccountProvider from "../src/context/AccountContext";
import AccountPage from "../src/components/Account/AccountPage";

const Account = () => {
    return (
        <AccountProvider>
            <AccountPage/>
        </AccountProvider>
    );
};

export default React.memo(Account);
