import React, {useEffect, useState} from "react"
import CategoriesPlaseOffer from "./CategoriesPlaseOffer"
import MobileModal from "#components/MobileModal";
import {useFormContext} from "react-hook-form";
import { useRouter } from "next/router";

export default function PlaceOfferMobile({children, editCategory = null}) {
    const router = useRouter()
    const isEditPage = router.pathname.includes('editPage')  
    const [categories, setCategories] = useState(null)
    const methods = useFormContext()

    useEffect(()=> {
        if(!isEditPage || !editCategory) {
            return
        }    
        const strCategory = editCategory.join()
        setCategories(strCategory)
        
    }, [router.pathname, editCategory])


    const generateAlias = (categories, reset = false) => {
        const categoriesArr = categories.split(',');
        for (let i = 1; i <= categoriesArr.length; i++) {
            const alias = 'alias' + i
            const item = reset ? null : categoriesArr[i - 1]
            console.log(alias,':', '--', item)
            methods.setValue(alias, item)
        }
    }


    const changeCategory = () => {
        methods.setValue('alias', null)
        generateAlias(categories, true)
        setCategories(false);
    }


    useEffect(() => {
        if (categories) {
            methods.setValue('alias', categories)
            methods.reset();
            generateAlias(categories)
        }
    }, [categories])


    return (
        <>
            {!isEditPage 
            && 
            <CategoriesPlaseOffer
                categories={categories}
                dialog={!categories}
                setCategories={setCategories}
            />}
            <MobileModal
                title={isEditPage ? 'Редактирование' : 'Новое объявление'}
                dialog={categories}
                close={changeCategory}
            >
                {children}
            </MobileModal>
        </>
    )
}