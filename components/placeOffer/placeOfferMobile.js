import React, {useEffect, useState} from "react"
import CategoriesPlaseOffer from "./CategoriesPlaseOffer"
import MobileModal from "#components/MobileModal";
import {useFormContext} from "react-hook-form";

export default function PlaceOfferMobile({children}) {


    const [categories, setCategories] = useState(null)
    const methods = useFormContext()


    const generateAlias = (categories, reset = false) => {
        const categoriesArr = categories.split(',');
        for (let i = 1; i <= categoriesArr.length; i++) {
            const alias = 'alias' + i
            const item = reset ? null : categoriesArr[i - 1]
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
            generateAlias(categories)
        }
    }, [categories])


    return (
        <>
            <CategoriesPlaseOffer
                categories={categories}
                dialog={!categories}
                setCategories={setCategories}
            />
            <MobileModal
                title='Новое объявление'
                dialog={categories}
                close={changeCategory}
            >
                {children}
            </MobileModal>
        </>
    )
}