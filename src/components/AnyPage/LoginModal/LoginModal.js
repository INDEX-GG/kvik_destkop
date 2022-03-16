import React from 'react'

import Login from '#components/auth/Login'
import { DialogCTX } from "#lib/Context/DialogCTX";

const LoginModal = ({
    openRegForm,
    setOpenRegForm,
    openLoginForm,
    setOpenLoginForm,
    isAlreadyExistForm,
    setIsAlreadyExistForm
}) => {

    return (
        <DialogCTX.Provider value={{openRegForm, setOpenRegForm, openLoginForm, setOpenLoginForm, isAlreadyExistForm, setIsAlreadyExistForm}}>
            <Login />
        </DialogCTX.Provider>
    )
}

export default React.memo(LoginModal)
