import CategoriesContent from "../header/CategoriesContent"
// import { Button } from "@material-ui/core"
// import { makeStyles } from "@material-ui/core"
import { useRouter } from "next/router"
import MobileModal from "../MobileModal"
// const useStyles = makeStyles(() => ({
//     buttonSend: {
//         position: "absolut",
//         left: "50%",
//         width: "100%",
//         maxWidth: "460px",
//         margin: "32px 0px",
//         height: "32px",
//         transform: "translateX(-50%)"
//     },
//     buttonContainer: {
//         padding: "0 10px",
//         position: "relative"
//     }
// })) 

export default function CategoriesPlaseOffer({categories, categoriesFunc, dialog, dialogFunc}) {
    const router = useRouter()
    // const classes = useStyles()

	console.log(categories);

	const categoriesChange = (str) => {
		categoriesFunc(str)
		dialogFunc()
	}

    return (
		<MobileModal title='Новое объявление' dialog={dialog} close={() => router.push('/')}>
			<CategoriesContent toggleDrawer={false} changeCategories={categoriesChange}/>
			{/* <div className={classes.buttonContainer}>
				<Button className={classes.buttonSend} color='primary' variant='contained' disabled={categories == null ? true : false} onClick={() => dialogFunc()} >Продолжить</Button>
			</div> */}
		</MobileModal>
    )
}