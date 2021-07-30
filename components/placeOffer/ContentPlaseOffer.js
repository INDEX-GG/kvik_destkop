import { Button, Dialog, Box, makeStyles } from "@material-ui/core"
import { useForm, FormProvider } from 'react-hook-form';
import MobileContact from "./MobileContacts";
import MobileLocation from "./MobileLocation";
import MobilePrice from "./MobilePrice/MobilePrice"

const useStyles = makeStyles(theme => ({
    buttonSend: {
        position: "absolut",
        left: "50%",
        width: "100%",
        maxWidth: "460px",
        margin: "32px 0px",
        height: "32px",
        transform: "translateX(-50%)"
    },
    plaseOfferTitle: {
        textAlign: "center",
        padding: "16px 0px 12px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        marginBottom: "24px"
    },
    plaseOfferSubTitle: {
        paddingTop: "5px",
        color: "#8F8F8F",
        textAlign: "center"
    },
    plaseOfferInput: {
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        width: "100%",
        height: "48px",
        border: "0",
        paddingLeft: "11px",
        marginBottom: "32px"
    },
    plaseOfferBox: {
        width: "100%",
        padding: "0 12px",
        backgroundColor: "#ffff",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)"
    },
})) 

export default function ContentPlaseOffer({dialog}) {
    const classes = useStyles()
    const methods = useForm();

    return(
        <Dialog open={dialog} fullScreen={true}>
                <div className="modal__wrapper_md accountContainer">
                    <div className="modal__block__top accountTop">
                        <>
                            <div className="accountArrowLeft"></div>
                            <div className={classes.plaseOfferTitle}>
                                <h6 className="modal__block__top_title">Новое объявление</h6>
                                <div className={classes.plaseOfferSubTitle}>2/2</div>
                            </div>
                        </>
                        <Box>
                            <FormProvider {...methods}>
                                <form>
                                    <Box>
                                        <input placeholder="Введите название товара" type="text" className={classes.plaseOfferInput}/>
                                        <div>PHOTO</div>
                                        <input placeholder="Введите описание товара (до 4 000 символов)" type="text" className={classes.plaseOfferInput}/>
                                    </Box>
                                    <MobilePrice/>
                                    <MobileLocation/>
                                    <MobileContact/>
                                </form>
                            </FormProvider>
                        </Box>
                    </div>
                </div>
        </Dialog>
    )
}