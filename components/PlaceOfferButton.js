import {useContext} from 'react'
import { Button, makeStyles } from "@material-ui/core"
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { useRouter } from "next/router";
import { LoginDrawerCTX } from "../lib/Context/DialogCTX"
import { useAuth } from "../lib/Context/AuthCTX";

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        position: "fixed",
        bottom: "22px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1
    },
    buttonText: {
        [theme.breakpoints.down("400")]: {
            fontSize: "12px",
            padding: "4px 10px"
        },
        [theme.breakpoints.down("325")]: {
            padding: "4px 8px"
        }
    }
}))

export default function PlaceOfferButton() {
    const router = useRouter()
    const classes = useStyles()
	const { isAuth } = useAuth();

    const {
        setModalState
    } = useContext(LoginDrawerCTX)

    const handlerClick = () => {
        if(isAuth) {
            router.push("/placeOffer")
        } else {
            setModalState({left: true})
        }
    }

    return (
        <div className={classes.buttonContainer}>
            <Button
                className={classes.buttonText}
                onClick={handlerClick}
                variant="contained"
                color="primary"
            >
                <AddRoundedIcon />
                Подать объявление
            </Button>
        </div>
    )
}
