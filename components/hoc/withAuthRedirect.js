import { useContext, useMemo } from "react";
import { useAuth } from "#lib/Context/AuthCTX";
import { LoginDrawerCTX } from "#lib/Context/DialogCTX";
import { useRouter } from "next/router";

import { privateRoutes } from "src/routes/routes";
import LoginModal from "src/components/AnyPage/LoginModal/LoginModal";

const withAuth = Component => {
    const Auth = (props) => {

        const {isAuth} = useAuth();
        const router = useRouter();

        const {openRegForm, setOpenRegForm,openLoginForm, setOpenLoginForm,isAlreadyExistForm, setIsAlreadyExistForm} = useContext(LoginDrawerCTX)
        // Если текущий url = privateRoutes
        const isPrivateRoutesResult = useMemo(() => !!privateRoutes.find(route => route === router.pathname),[privateRoutes])
        if (isPrivateRoutesResult === true) {
            {!isAuth
                ?setOpenLoginForm(true)
                :setOpenLoginForm(false)
            }
            if(!isAuth){
                return ( 
                    <LoginModal
                        openRegForm={openRegForm}
                        setOpenRegForm={setOpenRegForm}
                        openLoginForm={openLoginForm}
                        setOpenLoginForm={setOpenLoginForm}
                        isAlreadyExistForm={isAlreadyExistForm}
                        setIsAlreadyExistForm={setIsAlreadyExistForm}
                    />
                )           
            }
        }
        return (
            <Component {...props} />
        );
    };
  
    // Скопируем getInitialprops, чтобы он тоже работал
    if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps;
    }
  
    return Auth;
  };
  
  export default withAuth;
