import Active_icon from "../UI/icons/ActiveIcon"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
    messageContainer: {
        textAlign: "center",
        marginTop: "16px"
    },
    messageTitle: {
        color: "#000000",
        fontSize: "22px",
        fontWeight: "500"
    },
    messageSubtitle: {
        color: "#8F8F8F"
    }
}))

export default function EndMessage() {
    const classes = useStyles()
    return (
        <div className={classes.messageContainer}>
            <Active_icon Size={45} Color="#00A0AB" />
            <div className={classes.messageTitle}>На этом пока все!</div>
            <p className={classes.messageSubtitle}>Вы посмотрели всеновые публикации за последние 3 дня</p>
        </div>
    )
}