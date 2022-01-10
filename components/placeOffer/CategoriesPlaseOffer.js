import CategoriesContent from "../header/CategoriesContent"
import { useRouter } from "next/router"
import MobileModal from "../MobileModal"
import categoryJson from '/public/placeOfferJson/new_catalog.json'

export default function CategoriesPlaseOffer({setCategories, dialog}) {

    const router = useRouter()
    const categoryMainAlias = categoryJson?.category

	const categoriesChange = (str) => {
        setCategories(str);
	}


    return (
		<MobileModal title='Новое объявление' dialog={dialog} close={() => router.push('/')}>
			<CategoriesContent
                changeCategories={categoriesChange}
                categoryMainAlias={categoryMainAlias}
            />
		</MobileModal>
    )
}