import CategoriesContent from "../header/CategoriesContent"
import { Button, Dialog } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    buttonSend: {
        position: "absolut",
        left: "50%",
        width: "100%",
        maxWidth: "460px",
        margin: "32px 0px",
        height: "32px",
        transform: "translateX(-50%)"
    }
})) 

export default function CategoriesPlaseOffer({categories, categoriesFunc, dialog, dialogFunc}) {

    const classes = useStyles()
    return (
        <Dialog open={dialog} fullScreen={true}>
            <div className="modal__wrapper_md accountContainer">
                <div className="modal__block__top accountTop">
                    <>
                        <div className="accountArrowLeft"></div>
                        <h6 className="modal__block__top_title accountTitle">Новое объявление</h6>
                    </>
                    <CategoriesContent toggleDrawer={false} changeCategories={categoriesFunc}/>
                    <Button className={classes.buttonSend} color='primary' variant='contained' disabled={categories == null ? true : false} onClick={() => dialogFunc()} >Продолжить</Button>
                </div>
            </div>
        </Dialog>
    )
}