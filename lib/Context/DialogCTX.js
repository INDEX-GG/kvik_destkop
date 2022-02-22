import { createContext, useState } from "react";

export const DialogCTX = createContext({});
export const LoginDrawerCTX = createContext({});
export const RegistrationCTX = createContext({});

export const UnpublishCTX = createContext({});
export const DelActiveCTX = createContext({});

const LoginDrawerProvider = ({children}) => {
  const [modalState, setModalState] = useState({ left: false });

  return (
    <LoginDrawerCTX.Provider value={{modalState, setModalState}}>
        {children}
    </LoginDrawerCTX.Provider>
  )
}

export default LoginDrawerProvider
