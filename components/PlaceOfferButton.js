import { Button, makeStyles } from "@material-ui/core"
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        position: "fixed",
        top: "80%",
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
    return (
        <div className={classes.buttonContainer}>
            <Button className={classes.buttonText} onClick={() => router.push("/placeOffer")} variant="contained" color="primary">
                <AddRoundedIcon />
                Подать объявление
            </Button>
        </div>
    )
}